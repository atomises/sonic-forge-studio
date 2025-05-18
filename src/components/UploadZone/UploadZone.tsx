
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import './UploadZone.css';

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

  const getIconClass = () => {
    if (isDragging) return 'upload-icon dragging';
    if (isHovering) return 'upload-icon hovering';
    return 'upload-icon default';
  };

  const getButtonClass = () => {
    if (isDragging) return 'upload-button dragging';
    if (isHovering) return 'upload-button hovering';
    return 'upload-button default';
  };

  return (
    <div 
      className={`upload-zone ${isDragging ? 'dragging' : ''}`}
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
      
      <div className={`upload-content ${isDragging ? 'dragging' : ''}`}>
        <div>
          <Upload className={getIconClass()} />
        </div>
        
        <h3 className="upload-title neon-gradient">Solte seu arquivo de áudio aqui</h3>
        
        <p className="upload-info">
          Formatos suportados: MP3, WAV, OGG
          <br/>
          Tamanho máximo: 50MB
        </p>
        
        <button
          type="button"
          onClick={handleButtonClick}
          className={getButtonClass()}
        >
          Selecionar arquivo
        </button>
      </div>
    </div>
  );
};

export default UploadZone;
