
import React from 'react';
import './DemixerHeader.css';

const DemixerHeader: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="flex-center">
          <div className="text-center">
            <h1 className="title neon-gradient">
              DEMIXER
            </h1>
            <p className="description">
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
