
import React from 'react';
import { LetterMode } from '../types';

interface ModeSelectorProps {
  onSelect: (mode: LetterMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelect }) => {
  const modes = [
    {
      id: LetterMode.SCHOOL,
      title: 'Como colegio',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300'
    },
    {
      id: LetterMode.INDIVIDUAL,
      title: 'De forma personal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
    },
    {
      id: LetterMode.SISTER,
      title: 'Como hermana',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'bg-amber-50 text-amber-700 border-amber-100 hover:border-amber-300'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onSelect(mode.id)}
          className={`flex flex-col items-center text-center p-8 rounded-2xl border transition-all transform hover:-translate-y-1 hover:shadow-lg ${mode.color}`}
        >
          <div className="p-3 rounded-full bg-white/50 mb-4 shadow-sm">
            {mode.icon}
          </div>
          <h3 className="text-xl font-serif font-bold">{mode.title}</h3>
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
