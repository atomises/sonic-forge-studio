
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/x-wav', 'audio/mp3'];
    
    if (!validAudioTypes.includes(file.type)) {
      toast({
        title: "Formato incompatível",
        description: "Por favor envie um arquivo de áudio (.mp3, .wav, .ogg)",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 50MB",
        variant: "destructive"
      });
      return;
    }

    onFileSelected(file);
    
    toast({
      title: "Arquivo recebido",
      description: `"${file.name}" foi enviado com sucesso!`
    });
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      className={`relative w-full max-w-3xl mx-auto rounded-lg border-2 border-dashed p-12 text-center transition-all duration-300
        ${isDragging 
          ? 'border-demixer-accent bg-demixer-accent/10 accent-shadow' 
          : isHovering
            ? 'border-demixer-neon bg-demixer-neon/10 neon-shadow'
            : 'border-demixer-charcoal bg-demixer-darker/50'
        }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="audio/*"
        onChange={handleFileChange}
      />
      
      <div className={`transition-all duration-300 ${isDragging ? 'scale-110' : ''}`}>
        <div className="mb-4">
          <Upload 
            className={`mx-auto h-16 w-16 transition-all duration-300 
              ${isDragging ? 'stroke-demixer-accent' : isHovering ? 'stroke-demixer-neon' : 'stroke-gray-400'}`} 
          />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 neon-gradient">Solte seu arquivo de áudio aqui</h3>
        
        <p className="text-sm text-gray-400 mb-6">
          Formatos suportados: MP3, WAV, OGG
          <br/>
          Tamanho máximo: 50MB
        </p>
        
        <button
          type="button"
          onClick={handleButtonClick}
          className={`px-6 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all
            ${isDragging 
              ? 'bg-demixer-accent text-white hover:bg-demixer-accent-hover focus:ring-demixer-accent/50' 
              : isHovering
                ? 'bg-demixer-neon text-white hover:bg-demixer-neon-hover focus:ring-demixer-neon/50'
                : 'bg-demixer-charcoal text-white hover:bg-demixer-charcoal-dark focus:ring-demixer-charcoal/50'
            }`}
        >
          Selecionar arquivo
        </button>
      </div>
    </div>
  );
};

export default UploadZone;
