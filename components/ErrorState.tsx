
import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  onReset: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry, onReset }) => {
  return (
    <div className="bg-red-50 p-12 rounded-2xl border border-red-100 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-red-800">¡Vaya! Algo no ha salido bien</h2>
      <p className="text-red-700 max-w-md mx-auto">{message}</p>
      <div className="flex justify-center gap-4">
        <button 
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
        <button 
          onClick={onReset}
          className="px-6 py-2 bg-white border border-red-200 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors"
        >
          Ir al inicio
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
