
import React from 'react';
import '../styles/ProcessingIndicator.css';

interface ProcessingIndicatorProps {
  progress?: number;
}

const ProcessingIndicator: React.FC<ProcessingIndicatorProps> = ({ progress }) => {
  // Generate random heights for sound wave bars
  const generateBars = () => {
    return Array(20).fill(0).map((_, i) => (
      <div 
        key={i} 
        className="wave-bar animate-pulse-wave"
        style={{ 
          height: `${20 + Math.random() * 40}px`,
          animationDelay: `${i * 0.05}s`
        }}
      />
    ));
  };

  return (
    <div className="processing">
      <div className="processing-card glass-morphism">
        <h3 className="processing-title text-gradient">
          Demixando sua faixa
        </h3>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress ?? 0}%` }}
            />
          </div>
          {progress !== undefined && (
            <p className="progress-percent">
              {progress}% Completo
            </p>
          )}
        </div>
        
        <div className="wave-container">
          {generateBars()}
        </div>
        
        <div className="processing-info">
          <p className="processing-status">
            Processando com IA avançada
          </p>
          <p className="processing-detail">
            Separando vocais, bateria, baixo e mais...
          </p>
        </div>
      </div>
      
      <div className="spinner">
        <div className="spinner-outer animate-rotate-center" />
        <div className="spinner-inner animate-rotate-center" />
      </div>
    </div>
  );
};

export default ProcessingIndicator;
