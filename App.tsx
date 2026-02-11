
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import UserForm from './components/UserForm';
import Preview from './components/Preview';
import QuotaIndicator from './components/QuotaIndicator';
import { UserData, GeneratedContent, AppStep, AppQuota, ThemeType } from './types';
import { getQuota, incrementQuota, saveUser, getUser, saveDraft, getDraft } from './services/storage';
import { generatePoemAndArt } from './services/geminiService';
import { MAX_MONTHLY_CALLS } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.FORM);
  const [quota, setQuota] = useState<AppQuota>(getQuota());
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<ThemeType>('serenity');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    maleSkinTone: '',
    femaleSkinTone: '',
    phone: '',
    likes: '',
    poemStyle: 'classique'
  });
  const [generated, setGenerated] = useState<GeneratedContent | null>(null);

  // Initialize from cache
  useEffect(() => {
    const cachedUser = getUser();
    const cachedDraft = getDraft();
    const cachedTheme = localStorage.getItem('ame_poetique_theme') as ThemeType;
    
    if (cachedUser) setUserData(prev => ({ ...prev, ...cachedUser }));
    if (cachedDraft) {
      setGenerated(cachedDraft);
      setStep(AppStep.PREVIEW);
    }
    if (cachedTheme) setTheme(cachedTheme);
  }, []);

  // Update body class for themes
  useEffect(() => {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('ame_poetique_theme', theme);
  }, [theme]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string, value: string } }) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (quota.count >= MAX_MONTHLY_CALLS) {
      setStep(AppStep.LIMIT_REACHED);
      return;
    }

    setIsLoading(true);
    try {
      const result = await generatePoemAndArt(userData);
      setGenerated(result);
      incrementQuota();
      setQuota(getQuota());
      saveUser(userData);
      saveDraft(result);
      setStep(AppStep.PREVIEW);
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Désolé, l'inspiration nous fait défaut. Réessayez dans un instant.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendSMS = () => {
    if (!generated) return;
    const message = `Pour toi ${userData.name}, une attention particulière :\n\n${generated.poem}`;
    const smsUrl = `sms:${userData.phone}?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  };

  const handleBackToForm = () => {
    setStep(AppStep.FORM);
  };

  const canRequestMore = quota.count < MAX_MONTHLY_CALLS;

  return (
    <Layout theme={theme} onThemeChange={setTheme}>
      <QuotaIndicator count={quota.count} />

      {step === AppStep.FORM && (
        <UserForm 
          data={userData}
          onChange={handleInputChange}
          onSubmit={handleGenerate}
          isLoading={isLoading}
          disabled={!canRequestMore}
        />
      )}

      {step === AppStep.PREVIEW && generated && (
        <Preview 
          content={generated}
          userData={userData}
          onRegenerate={handleGenerate}
          onSend={handleSendSMS}
          onBack={handleBackToForm}
          canRegenerate={canRequestMore}
        />
      )}

      {step === AppStep.LIMIT_REACHED && (
        <div className="text-center space-y-4 animate-fade-in py-10">
          <div className="text-5xl mb-4">⌛</div>
          <h2 className="text-2xl font-display" style={{ color: 'var(--text-primary)' }}>Limite mensuelle</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            L'amour n'a pas de limite, mais votre quota de {MAX_MONTHLY_CALLS} créations est épuisé.
          </p>
          {generated && (
            <button 
              onClick={() => setStep(AppStep.PREVIEW)}
              className="px-6 py-2 border-2 rounded-full text-sm font-medium transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              Revoir mon dernier poème
            </button>
          )}
          <button 
             onClick={handleBackToForm}
             className="block mx-auto opacity-60 hover:underline text-xs"
             style={{ color: 'var(--text-secondary)' }}
          >
            Retour
          </button>
        </div>
      )}
    </Layout>
  );
};

export default App;
