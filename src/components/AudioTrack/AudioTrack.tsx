
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download } from 'lucide-react';
import './AudioTrack.css';

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

  const getTrackProgressStyle = () => {
    const colorStart = color === 'vocals' ? '#d946ef' : 
                       color === 'drums' ? '#0ea5e9' : 
                       color === 'bass' ? '#f97316' : '#10b981';
    
    const colorEnd = color === 'vocals' ? '#a855f7' : 
                     color === 'drums' ? '#06b6d4' : 
                     color === 'bass' ? '#eab308' : '#059669';
    
    return {
      background: `linear-gradient(to right, ${colorStart} 0%, ${colorEnd} ${(currentTime / duration) * 100}%, #2a2a2a ${(currentTime / duration) * 100}%)`
    };
  };

  const getVolumeStyle = () => {
    const colorStart = color === 'vocals' ? '#d946ef' : 
                       color === 'drums' ? '#0ea5e9' : 
                       color === 'bass' ? '#f97316' : '#10b981';
    
    const colorEnd = color === 'vocals' ? '#a855f7' : 
                     color === 'drums' ? '#06b6d4' : 
                     color === 'bass' ? '#eab308' : '#059669';
    
    return {
      background: `linear-gradient(to right, ${colorStart} 0%, ${colorEnd} ${volume * 100}%, #2a2a2a ${volume * 100}%)`
    };
  };

  return (
    <div className="track track-gradient glass-morphism">
      <audio ref={audioRef} src={audioUrl} />
      
      <div className="track-header">
        <button 
          onClick={togglePlayPause}
          className={`play-button button-${color}`}
        >
          {isPlaying ? (
            <Pause className="play-icon" />
          ) : (
            <Play className="play-icon play" />
          )}
        </button>
        
        <div className="track-info">
          <h3 className="track-title">{name}</h3>
          <div className="track-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        <button 
          onClick={handleDownload}
          className="download-button"
        >
          <Download className="download-icon" />
        </button>
      </div>
      
      <div className="progress-container">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.01"
          value={currentTime}
          onChange={handleSeek}
          className="progress-input"
          style={getTrackProgressStyle()}
        />
      </div>
      
      <div className="volume-container">
        <span className="volume-label">Vol</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-input"
          style={getVolumeStyle()}
        />
      </div>

      <div className={`waveform`}>
        <div className={`waveform-base wave-${color} animate-waveform`}></div>
      </div>
    </div>
  );
};

export default AudioTrack;
