
import React, { useState, useEffect } from 'react';
import UploadZone from '@/components/UploadZone';
import ProcessingIndicator from '@/components/ProcessingIndicator';
import TrackList from '@/components/TrackList';
import DemixerHeader from '@/components/DemixerHeader';

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

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setIsProcessing(true);
    setProgress(0);
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
            return 100;
          }
          
          return newProgress;
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-demixer-darker to-demixer-dark text-white">
      <DemixerHeader />
      
      <main className="flex-grow container mx-auto px-4 pb-16">
        {!file && !isProcessing && tracks.length === 0 && (
          <UploadZone onFileSelected={handleFileSelected} />
        )}
        
        {isProcessing && (
          <ProcessingIndicator progress={Math.round(progress)} />
        )}
        
        {!isProcessing && tracks.length > 0 && (
          <div className="animate-fade-in">
            <TrackList tracks={tracks} />
            
            <div className="text-center mt-12">
              <button
                onClick={() => {
                  setFile(null);
                  setTracks([]);
                }}
                className="px-6 py-2 rounded-md bg-demixer-accent hover:bg-demixer-accent-hover text-white font-medium transition-all"
              >
                Processar outra música
              </button>
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
