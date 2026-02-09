
import React, { useState } from 'react';
import { LetterMode, AppState, FormData, LetterResult } from './types';
import { generateLetter } from './services/geminiService';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import LetterForm from './components/LetterForm';
import LetterResultView from './components/LetterResultView';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('HOME');
  const [mode, setMode] = useState<LetterMode | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [result, setResult] = useState<LetterResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectMode = (selectedMode: LetterMode) => {
    setMode(selectedMode);
    setState('FORM');
  };

  const handleSubmitForm = async (data: FormData) => {
    setFormData(data);
    setState('LOADING');
    try {
      const letter = await generateLetter(data);
      setResult(letter);
      setState('RESULT');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ocurrió un error inesperado al generar la carta.');
      setState('ERROR');
    }
  };

  const handleReset = () => {
    setMode(null);
    setFormData(null);
    setResult(null);
    setError(null);
    setState('HOME');
  };

  const handleRetry = () => {
    if (formData) {
      handleSubmitForm(formData);
    } else {
      handleReset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Header />
      
      <main className="flex-grow mt-8">
        {state === 'HOME' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ModeSelector onSelect={handleSelectMode} />
            <p className="mt-12 text-center text-sm text-stone-500 italic">
              Experiencia pública sin guardar datos. Puedes copiar o guardar como PDF.
            </p>
          </div>
        )}

        {state === 'FORM' && mode && (
          <LetterForm 
            mode={mode} 
            onSubmit={handleSubmitForm} 
            onBack={handleReset}
          />
        )}

        {state === 'LOADING' && (
          <LoadingState />
        )}

        {state === 'RESULT' && result && (
          <LetterResultView 
            result={result} 
            onReset={handleReset} 
          />
        )}

        {state === 'ERROR' && (
          <ErrorState 
            message={error || 'Error desconocido'} 
            onRetry={handleRetry} 
            onReset={handleReset} 
          />
        )}
      </main>

      <footer className="mt-16 pt-8 border-t border-stone-200 text-center text-stone-400 no-print flex flex-col gap-1">
        <p className="text-xs">@ 2026 Fundación Vedruna Educación. #200AñosVedruna</p>
        <p className="text-[10px]">Damián Buenvarón</p>
      </footer>
    </div>
  );
};

export default App;
