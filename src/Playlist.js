// src/components/Playlist.js
import React from 'react';

const Playlist = ({ audioFiles, currentTrackIndex, onSelectTrack }) => {
  return (
    <div>
      <h3>Playlist:</h3>
      <ul>
        {audioFiles.map((track, index) => (
          <li key={index} onClick={() => onSelectTrack(index)} style={{ cursor: 'pointer' }}>
            {index === currentTrackIndex ? <strong>{track.name}</strong> : track.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
