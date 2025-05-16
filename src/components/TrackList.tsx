
import React from 'react';
import AudioTrack from './AudioTrack';

interface Track {
  id: string;
  name: string;
  audioUrl: string;
  type: 'vocals' | 'drums' | 'bass' | 'other';
}

interface TrackListProps {
  tracks: Track[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  if (!tracks.length) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gradient text-center">Faixas Separadas</h2>
      
      <div className="space-y-4">
        {tracks.map((track) => (
          <AudioTrack
            key={track.id}
            name={track.name}
            audioUrl={track.audioUrl}
            color={track.type}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackList;
