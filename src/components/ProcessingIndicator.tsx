
import React from 'react';

interface ProcessingIndicatorProps {
  progress?: number;
}

const ProcessingIndicator: React.FC<ProcessingIndicatorProps> = ({ progress }) => {
  // Generate random heights for sound wave bars
  const generateBars = () => {
    return Array(20).fill(0).map((_, i) => (
      <div 
        key={i} 
        className={`w-1 mx-0.5 rounded-full animate-pulse-wave bg-gradient-to-t from-demixer-accent to-demixer-neon`}
        style={{ 
          height: `${20 + Math.random() * 40}px`,
          animationDelay: `${i * 0.05}s`
        }}
      />
    ));
  };

  return (
    <div className="w-full max-w-xl mx-auto py-16 flex flex-col items-center">
      <div className="glass-morphism rounded-xl p-8 w-full">
        <h3 className="text-2xl font-bold text-center mb-8 text-gradient">
          Demixando sua faixa
        </h3>
        
        <div className="mb-8">
          <div className="relative h-3 w-full bg-demixer-darker rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-demixer-accent to-demixer-neon rounded-full transition-all duration-300"
              style={{ width: `${progress ?? 0}%` }}
            />
          </div>
          {progress !== undefined && (
            <p className="text-center text-sm mt-2 text-gray-400">
              {progress}% Completo
            </p>
          )}
        </div>
        
        <div className="flex justify-center items-end h-16 mb-4">
          {generateBars()}
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-1">
            Processando com IA avançada
          </p>
          <p className="text-sm text-gray-500">
            Separando vocais, bateria, baixo e mais...
          </p>
        </div>
      </div>
      
      <div className="mt-8 relative">
        <div className="w-16 h-16 rounded-full border-4 border-demixer-accent border-t-transparent animate-rotate-center" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-demixer-neon border-b-transparent animate-rotate-center" style={{ animationDirection: 'reverse' }} />
      </div>
    </div>
  );
};

export default ProcessingIndicator;
