
import React, { useState } from 'react';
import { LetterResult } from '../types';

interface LetterResultViewProps {
  result: LetterResult;
  onReset: () => void;
}

const LetterResultView: React.FC<LetterResultViewProps> = ({ result, onReset }) => {
  const [isShaded, setIsShaded] = useState(false);

  const triggerShade = () => {
    setIsShaded(true);
    setTimeout(() => setIsShaded(false), 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.content);
    triggerShade();
    setTimeout(() => alert('Copiado al portapapeles'), 100);
  };

  const handlePrint = () => {
    triggerShade();
    
    // Cambiar temporalmente el título del documento para que el PDF tenga un nombre sugerido bonito
    const originalTitle = document.title;
    document.title = `Carta_Joaquina_Vedruna_${new Date().getTime()}`;
    
    // Pequeño retardo para que la sombra visual se aprecie antes de abrir el diálogo
    setTimeout(() => {
      window.print();
      // Restaurar el título original después de que se abra el diálogo de impresión
      document.title = originalTitle;
    }, 300);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className={`letter-container bg-[#fefdfa] p-8 md:p-12 rounded-sm shadow-xl border-t-[20px] border-amber-700 relative overflow-hidden transition-all duration-500 ${isShaded ? 'ring-4 ring-amber-200 shadow-2xl scale-[1.01]' : ''}`}>
        {/* Shading Overlay */}
        <div className={`absolute inset-0 bg-amber-900/5 pointer-events-none transition-opacity duration-500 ${isShaded ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none no-print">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2"/>
                <path d="M60 100 L140 100 M100 60 L100 140" stroke="currentColor" strokeWidth="2"/>
            </svg>
        </div>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-right text-stone-500 font-serif italic mb-8">
            {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          
          <div className="font-serif text-xl md:text-2xl leading-relaxed text-stone-800 whitespace-pre-wrap">
            {result.content}
          </div>

          <div className="pt-12 text-right">
            <div className="font-serif text-stone-500 italic mb-1">Tu humilde madre,</div>
            <div className="font-serif text-2xl font-bold text-stone-800">Joaquina de Vedruna</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 no-print">
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-xl font-medium text-stone-700 hover:bg-stone-50 transition-all shadow-sm active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copiar
        </button>
        <button 
          onClick={handlePrint}
          title="Abrir diálogo para imprimir o Guardar como PDF"
          className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-xl font-medium text-stone-700 hover:bg-stone-50 transition-all shadow-sm active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Imprimir / PDF
        </button>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-stone-800 text-white rounded-xl font-medium hover:bg-stone-900 transition-all shadow-lg active:scale-95"
        >
          Escribir otra carta
        </button>
      </div>
    </div>
  );
};

export default LetterResultView;