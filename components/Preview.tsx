
import React from 'react';
import { GeneratedContent, UserData } from '../types';

interface PreviewProps {
  content: GeneratedContent;
  userData: UserData;
  onRegenerate: () => void;
  onSend: () => void;
  onBack: () => void;
  canRegenerate: boolean;
}

const Preview: React.FC<PreviewProps> = ({ content, userData, onRegenerate, onSend, onBack, canRegenerate }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          style={{ color: 'var(--text-secondary)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux infos
        </button>
        <div className="text-right">
          <h2 className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Votre Création</h2>
          <p className="text-xs opacity-60" style={{ color: 'var(--text-secondary)' }}>Moment capturé</p>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border shadow-inner" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border)' }}>
        <img 
          src={content.imageUrl} 
          alt="Generated Art" 
          className="w-full aspect-square object-cover opacity-90"
        />
        <div className="p-6 md:p-8">
          <div className="whitespace-pre-wrap font-display text-lg leading-relaxed italic" style={{ color: 'var(--text-primary)' }}>
            {content.poem}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onRegenerate}
            disabled={!canRegenerate}
            className={`flex-1 py-4 rounded-xl font-medium border-2 transition-all transform active:scale-[0.98] ${
              canRegenerate 
                ? 'hover:opacity-80' 
                : 'opacity-20 cursor-not-allowed'
            }`}
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            Regénérer le même
          </button>
          <button
            onClick={onSend}
            className="flex-1 py-4 rounded-xl font-medium shadow-lg transition-all transform active:scale-[0.98] hover:opacity-90"
            style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-card)' }}
          >
            Envoyer par SMS
          </button>
        </div>
        
        <button
          onClick={onBack}
          className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--text-secondary)' }}
        >
          Modifier mes informations
        </button>
      </div>
      
      {!canRegenerate && (
        <p className="text-center text-xs font-medium text-red-400">
          Quota mensuel atteint. Revenez le mois prochain !
        </p>
      )}
    </div>
  );
};

export default Preview;
