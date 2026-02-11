
import React from 'react';
import { UserData } from '../types';

interface UserFormProps {
  data: UserData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string, value: string } }) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  disabled: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ data, onChange, onSubmit, isLoading, disabled }) => {
  const skinTones = [
    { id: 'noir', color: '#000000', label: 'Noire' },
    { id: 'blanc', color: '#FFFFFF', label: 'Blanche', border: true },
    { id: 'marron', color: '#8B4513', label: 'Marron' },
    { id: 'jaune', color: '#FCD34D', label: 'Jaune' },
  ];

  const poemStyles = [
    { id: 'classique', label: 'Classique (Rimes)', icon: '📜' },
    { id: 'moderne', label: 'Moderne (Libre)', icon: '✨' },
    { id: 'passionne', label: 'Ardent & Intense', icon: '🔥' },
    { id: 'court', label: 'Court & Doux', icon: '🍬' },
  ];

  const inputStyle = {
    backgroundColor: 'transparent',
    borderColor: 'var(--border)',
    color: 'var(--text-primary)',
  };

  const labelStyle = {
    color: 'var(--text-secondary)',
  };

  const handleSelect = (name: string, value: string) => {
    onChange({ target: { name, value } });
  };

  const SkinToneRow = ({ label, value, name }: { label: string, value: string, name: 'maleSkinTone' | 'femaleSkinTone' }) => (
    <div className="space-y-1">
      <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={labelStyle}>{label}</label>
      <div className="flex items-center gap-3 py-1">
        {skinTones.map((tone) => (
          <button
            key={tone.id}
            type="button"
            onClick={() => handleSelect(name, tone.id)}
            className={`w-8 h-8 rounded-full transition-all transform hover:scale-110 relative ${
              value === tone.id ? 'ring-2 ring-offset-2 ring-rose-500 scale-110 shadow-md' : 'opacity-60 grayscale-[0.3]'
            }`}
            style={{ 
              backgroundColor: tone.color, 
              border: tone.border ? '1px solid #e5e7eb' : 'none' 
            }}
            title={tone.label}
          >
            {value === tone.id && (
              <div className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider ml-1" style={labelStyle}>Nom de l'être aimé</label>
          <input
            required
            name="name"
            type="text"
            value={data.name}
            onChange={onChange}
            placeholder="Destinataire..."
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-stone-400 outline-none transition-all placeholder:opacity-30"
            style={inputStyle}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider ml-1" style={labelStyle}>Numéro de téléphone</label>
          <input
            required
            name="phone"
            type="tel"
            value={data.phone}
            onChange={onChange}
            placeholder="+33 6..."
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-stone-400 outline-none transition-all placeholder:opacity-30"
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-y border-stone-100 py-4" style={{ borderColor: 'var(--border)' }}>
        <SkinToneRow label="Peau du personnage masculin" value={data.maleSkinTone} name="maleSkinTone" />
        <SkinToneRow label="Peau du personnage féminin" value={data.femaleSkinTone} name="femaleSkinTone" />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider ml-1" style={labelStyle}>Style de poème</label>
        <div className="flex flex-wrap gap-2">
          {poemStyles.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => handleSelect('poemStyle', style.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                data.poemStyle === style.id 
                  ? 'bg-rose-500 text-white border-transparent shadow-md transform scale-105' 
                  : 'border-rose-200 opacity-70 hover:opacity-100'
              }`}
              style={data.poemStyle === style.id ? { backgroundColor: 'var(--text-secondary)' } : { borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <span className="mr-1">{style.icon}</span> {style.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider ml-1" style={labelStyle}>Ses passions</label>
        <textarea
          required
          name="likes"
          rows={2}
          value={data.likes}
          onChange={onChange}
          placeholder="Le jazz, les nuits étoilées, le chocolat..."
          className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-stone-400 outline-none transition-all placeholder:opacity-30 resize-none"
          style={inputStyle}
        />
      </div>

      <button
        disabled={isLoading || disabled || !data.maleSkinTone || !data.femaleSkinTone || !data.poemStyle}
        type="submit"
        className={`w-full py-4 rounded-xl font-medium shadow-lg transition-all transform active:scale-[0.98] ${
          isLoading || disabled || !data.maleSkinTone || !data.femaleSkinTone || !data.poemStyle
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:opacity-90'
        }`}
        style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-card)' }}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Écriture en cours...
          </span>
        ) : (
          'Générer ma surprise'
        )}
      </button>
    </form>
  );
};

export default UserForm;
