
import React from 'react';

const DemixerHeader: React.FC = () => {
  return (
    <header className="w-full py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 neon-gradient">
              DEMIXER
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Seu estúdio de demolição sonora. Faça upload de uma música e receba 
              as faixas separadas por inteligência artificial.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DemixerHeader;
