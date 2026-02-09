
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="bg-white p-12 rounded-2xl border border-stone-100 shadow-xl space-y-8 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-stone-100 rounded w-24"></div>
        <div className="h-4 bg-stone-100 rounded w-32"></div>
      </div>
      <div className="space-y-4">
        <div className="h-6 bg-stone-100 rounded w-1/4"></div>
        <div className="h-4 bg-stone-100 rounded w-full"></div>
        <div className="h-4 bg-stone-100 rounded w-full"></div>
        <div className="h-4 bg-stone-100 rounded w-3/4"></div>
      </div>
      <div className="space-y-4 pt-4">
        <div className="h-4 bg-stone-100 rounded w-full"></div>
        <div className="h-4 bg-stone-100 rounded w-5/6"></div>
        <div className="h-4 bg-stone-100 rounded w-full"></div>
      </div>
      <div className="flex flex-col items-end space-y-2 pt-8">
        <div className="h-4 bg-stone-100 rounded w-32"></div>
        <div className="h-6 bg-stone-100 rounded w-48"></div>
      </div>
      <div className="text-center text-stone-400 font-medium italic animate-bounce pt-8">
        Joaquina está redactando tu carta...
      </div>
    </div>
  );
};

export default LoadingState;
