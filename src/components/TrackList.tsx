
import React from 'react';
import AudioTrack from './AudioTrack';
import '../styles/TrackList.css';

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
    <div className="tracklist">
      <h2 className="tracklist-title text-gradient">Faixas Separadas</h2>
      
      <div className="tracks">
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
