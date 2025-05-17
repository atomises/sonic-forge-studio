
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadZone from '@/components/UploadZone';
import ProcessingIndicator from '@/components/ProcessingIndicator';
import TrackList from '@/components/TrackList';
import DemixerHeader from '@/components/DemixerHeader';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/components/ui/sonner';

// Mock data for the tracks
const mockTracks = [
  {
    id: '1',
    name: 'Vocals',
    audioUrl: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg',
    type: 'vocals' as const,
  },
  {
    id: '2',
    name: 'Drums',
    audioUrl: 'https://actions.google.com/sounds/v1/alarms/medium_bell_ringing_near.ogg',
    type: 'drums' as const,
  },
  {
    id: '3',
    name: 'Bass',
    audioUrl: 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg',
    type: 'bass' as const,
  },
  {
    id: '4',
    name: 'Other',
    audioUrl: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg',
    type: 'other' as const,
  },
];

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [tracks, setTracks] = useState<typeof mockTracks>([]);
  const [projectName, setProjectName] = useState<string>('');
  
  const { user, isAuthenticated, useCredit, saveProject } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Define default project name from file name
    if (file) {
      setProjectName(file.name.split('.')[0] || 'Novo projeto');
    }
  }, [file]);

  const handleFileSelected = (selectedFile: File) => {
    // Check if user is logged in
    if (!isAuthenticated) {
      toast.error('Você precisa estar logado para processar músicas', {
        description: 'Por favor, faça login para continuar',
        action: {
          label: 'Login',
          onClick: () => navigate('/login'),
        },
      });
      return;
    }
    
    // Check if user has credits
    if (user && user.plan.creditsRemaining <= 0) {
      toast.error('Você não tem créditos suficientes', {
        description: 'Atualize seu plano para continuar processando músicas',
        action: {
          label: 'Ver planos',
          onClick: () => navigate('/plans'),
        },
      });
      return;
    }
    
    // Proceed with file processing
    setFile(selectedFile);
    setIsProcessing(true);
    setProgress(0);
    
    // Use a credit
    useCredit();
    
    toast.info('Processando sua música', {
      description: 'Isso pode levar alguns minutos',
    });
  };

  // Simulate a processing backend
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + Math.random() * 10;
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            setTracks(mockTracks);
            
            toast.success('Música processada com sucesso!', {
              description: 'Todas as faixas estão prontas para download',
            });
            
            // Save project if authenticated
            if (isAuthenticated && file) {
              const newProject = {
                id: Date.now().toString(),
                name: projectName || file.name.split('.')[0] || 'Projeto sem nome',
                date: new Date(),
                originalFile: file.name,
                tracks: mockTracks
              };
              saveProject(newProject);
            }
            
            return 100;
          }
          
          return newProgress;
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isProcessing, file, projectName, saveProject, isAuthenticated]);

  const handleSaveProject = () => {
    if (isAuthenticated && file) {
      const newProject = {
        id: Date.now().toString(),
        name: projectName || file.name.split('.')[0] || 'Projeto sem nome',
        date: new Date(),
        originalFile: file.name,
        tracks: mockTracks
      };
      saveProject(newProject);
      
      toast.success('Projeto salvo com sucesso!', {
        description: 'Você pode acessá-lo no seu dashboard',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-demixer-darker to-demixer-dark text-white">
      <DemixerHeader />
      
      {isAuthenticated && user && (
        <div className="bg-demixer-dark text-center py-2 text-sm border-b border-gray-800">
          <span className="text-gray-400">Créditos disponíveis: </span>
          <span className="font-semibold">{user.plan.creditsRemaining}</span>
          <span className="text-gray-400"> de </span>
          <span className="font-semibold">{user.plan.creditsTotal}</span>
          {user.plan.creditsRemaining <= 1 && (
            <span className="ml-2 text-yellow-500">
              <a href="/plans" className="underline hover:text-yellow-400">
                Precisando de mais?
              </a>
            </span>
          )}
        </div>
      )}
      
      <main className="flex-grow container mx-auto px-4 pb-16">
        {!file && !isProcessing && tracks.length === 0 && (
          <div className="py-12">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 neon-gradient">
                Separe suas faixas musicais
              </h1>
              <p className="text-gray-400">
                Faça upload de uma música e receba instantaneamente as faixas isoladas: 
                vocais, bateria, baixo e outros instrumentos.
              </p>
              
              {!isAuthenticated && (
                <div className="mt-6 p-4 bg-demixer-darker border border-gray-800 rounded-lg">
                  <p className="mb-2">Para começar a usar o Demixer:</p>
                  <Button onClick={() => navigate('/login')} className="bg-demixer-accent hover:bg-demixer-accent-hover mr-4">
                    Login
                  </Button>
                  <a href="/plans" className="text-demixer-accent underline hover:text-white">
                    Ver planos
                  </a>
                </div>
              )}
            </div>

            <UploadZone onFileSelected={handleFileSelected} />
          </div>
        )}
        
        {isProcessing && (
          <ProcessingIndicator progress={Math.round(progress)} />
        )}
        
        {!isProcessing && tracks.length > 0 && (
          <div className="animate-fade-in pt-8">
            {isAuthenticated && (
              <div className="max-w-3xl mx-auto mb-6 bg-demixer-darker p-4 rounded-lg border border-gray-800">
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex-grow">
                    <label htmlFor="projectName" className="text-sm text-gray-400 block mb-1">
                      Nome do projeto:
                    </label>
                    <input 
                      type="text"
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="bg-demixer-dark border border-gray-700 rounded px-3 py-2 w-full"
                    />
                  </div>
                  <Button onClick={handleSaveProject} className="bg-demixer-accent hover:bg-demixer-accent-hover mt-auto">
                    Salvar Projeto
                  </Button>
                </div>
              </div>
            )}
            
            <TrackList tracks={tracks} />
            
            <div className="text-center mt-12 space-y-4">
              <Button
                onClick={() => {
                  setFile(null);
                  setTracks([]);
                }}
                className="px-6 py-2 rounded-md bg-demixer-accent hover:bg-demixer-accent-hover text-white font-medium transition-all"
              >
                Processar outra música
              </Button>
              
              {isAuthenticated && (
                <div>
                  <a href="/dashboard" className="block text-demixer-accent underline hover:text-white mt-2">
                    Ver todos seus projetos
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-demixer-darker py-4 text-center text-gray-500 text-sm">
        <p>Demixer &copy; {new Date().getFullYear()} - Estúdio de Demolição Sonora</p>
      </footer>
    </div>
  );
};

export default Index;
