
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download } from 'lucide-react';

interface AudioTrackProps {
  name: string;
  audioUrl: string;
  color?: 'vocals' | 'drums' | 'bass' | 'other';
}

const AudioTrack: React.FC<AudioTrackProps> = ({ name, audioUrl, color = 'vocals' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  const trackColors = {
    vocals: 'from-pink-500 to-purple-600',
    drums: 'from-blue-500 to-cyan-600',
    bass: 'from-orange-500 to-yellow-600',
    other: 'from-green-500 to-emerald-600',
  };

  const waveColors = {
    vocals: 'bg-gradient-to-b from-pink-500/80 to-purple-600/80',
    drums: 'bg-gradient-to-b from-blue-500/80 to-cyan-600/80',
    bass: 'bg-gradient-to-b from-orange-500/80 to-yellow-600/80',
    other: 'bg-gradient-to-b from-green-500/80 to-emerald-600/80',
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${name.toLowerCase()}_track.mp3`;
    link.click();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="relative track-gradient p-4 rounded-lg mb-4 glass-morphism">
      <audio ref={audioRef} src={audioUrl} />
      
      <div className="flex items-center gap-4 mb-3">
        <button 
          onClick={togglePlayPause} 
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
            bg-gradient-to-br ${trackColors[color]} hover:shadow-lg hover:scale-105`}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>
        
        <div className="flex-grow">
          <h3 className="font-bold text-white text-lg">{name}</h3>
          <div className="text-xs text-gray-400 flex justify-between">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        <button 
          onClick={handleDownload}
          className="p-2 rounded-full bg-demixer-charcoal hover:bg-demixer-charcoal-dark transition-all"
        >
          <Download className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="relative mb-3">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.01"
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-demixer-darker rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color === 'vocals' ? '#d946ef' : 
                                               color === 'drums' ? '#0ea5e9' : 
                                               color === 'bass' ? '#f97316' : 
                                               '#10b981'} 0%, ${color === 'vocals' ? '#a855f7' : 
                                                              color === 'drums' ? '#06b6d4' : 
                                                              color === 'bass' ? '#eab308' : 
                                                              '#059669'} ${(currentTime / duration) * 100}%, #2a2a2a ${(currentTime / duration) * 100}%)`
          }}
        />
      </div>
      
      {/* Volume control */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-400">Vol</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-demixer-darker rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color === 'vocals' ? '#d946ef' : 
                                               color === 'drums' ? '#0ea5e9' : 
                                               color === 'bass' ? '#f97316' : 
                                               '#10b981'} 0%, ${color === 'vocals' ? '#a855f7' : 
                                                              color === 'drums' ? '#06b6d4' : 
                                                              color === 'bass' ? '#eab308' : 
                                                              '#059669'} ${volume * 100}%, #2a2a2a ${volume * 100}%)`
          }}
        />
      </div>

      {/* Waveform visualization */}
      <div className="mt-4 h-16 relative overflow-hidden rounded-lg">
        <div className={`absolute inset-0 waveform-base ${waveColors[color]} animate-waveform`}></div>
      </div>
    </div>
  );
};

export default AudioTrack;
