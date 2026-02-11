
import { GoogleGenAI } from "@google/genai";
import { UserData, GeneratedContent } from "../types";

export const generatePoemAndArt = async (userData: UserData): Promise<GeneratedContent> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const getSkinDescription = (tone: string) => ({
    noir: "à la peau noire ébène",
    blanc: "à la peau blanche claire",
    marron: "à la peau mate/brune",
    jaune: "à la peau dorée/asiatique"
  }[tone] || "à la beauté radieuse");

  const maleDesc = getSkinDescription(userData.maleSkinTone);
  const femaleDesc = getSkinDescription(userData.femaleSkinTone);

  const stylePrompts = {
    classique: "dans un style classique avec des rimes riches et une structure élégante (type sonnet ou quatrains)",
    moderne: "dans un style moderne, en vers libres, avec des images métaphoriques contemporaines et sans obligation de rimes",
    passionne: "avec un ton ardent, brûlant de désir, très intense et passionné, utilisant un vocabulaire charnel et vibrant",
    court: "sous forme de haïku ou de court poème de 4 vers, très doux, minimaliste et percutant"
  };

  // 1. Poem Prompt - Focus on soul and passions rather than skin color rhymes
  const poemPrompt = `Écris un poème d'amour original et inspiré pour ${userData.name} ${stylePrompts[userData.poemStyle as keyof typeof stylePrompts] || stylePrompts.classique}. 
  Ne te focalise PAS sur la couleur de peau dans tes rimes ou tes métaphores textuelles. Concentre-toi sur l'âme, l'émotion pure et les passions de cette personne : ${userData.likes}.
  Le poème doit célébrer une connexion profonde et spirituelle.
  Langue : Français. 
  IMPORTANT : Ne fournis QUE le texte du poème. Aucun texte d'introduction, aucune explication, aucune conclusion.`;

  const poemResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: poemPrompt,
    config: {
      temperature: 1.0, // Higher temperature for more creativity
      systemInstruction: "Tu es un poète virtuose, adepte de métaphores puissantes et d'une écriture élégante. Évite les clichés et les rimes simplistes sur le physique. Privilégie l'émotion, le voyage intérieur et les centres d'intérêt mentionnés. Réponds exclusivement par les vers du poème."
    }
  });

  const poem = poemResponse.text?.trim() || "La passion dépasse parfois les mots.";

  // 2. Image Prompt - Keeps skin tones for visual accuracy
  const skinToneImageDetail = (tone: string, gender: string) => ({
    noir: `un ${gender} à la peau noire`,
    blanc: `un ${gender} à la peau blanche`,
    marron: `un ${gender} à la peau mate`,
    jaune: `un ${gender} aux traits asiatiques et peau dorée`
  }[tone]);

  const maleDetail = skinToneImageDetail(userData.maleSkinTone, "homme");
  const femaleDetail = skinToneImageDetail(userData.femaleSkinTone, "femme");

  const imagePrompt = `Une œuvre d'art visuelle hautement romantique et onirique représentant un couple : ${maleDetail} et ${femaleDetail}. 
  Ils sont plongés dans un univers esthétique inspiré par : ${userData.likes}. 
  Style artistique : Fusion entre réalisme poétique et surréalisme doux, lumière cinématographique chaude, texture riche évoquant la peinture de maître. Ambiance intime et intemporelle.`;
  
  const imageResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: imagePrompt }]
    }
  });

  let imageUrl = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop";
  for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  return { poem, imageUrl };
};
