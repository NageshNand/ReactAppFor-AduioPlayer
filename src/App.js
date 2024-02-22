// src/components/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import Player from './Player';
import Playlist from './Playlist';

const App = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

  useEffect(() => {
    // Load last playing audio file index from localStorage
    const storedIndex = localStorage.getItem('lastPlayedIndex');
    if (storedIndex !== null) {
      setCurrentTrackIndex(parseInt(storedIndex, 10));
    }
  }, []);

  useEffect(() => {
    // Load audio files from localStorage
    const storedFiles = JSON.parse(localStorage.getItem('audioFiles'));
    if (storedFiles) {
      setAudioFiles(storedFiles);
    }
  }, []); // Add this dependency array to prevent unnecessary re-renders

  const handleFileUpload = (event) => {
    const files = event.target.files;
    setAudioFiles([...audioFiles, ...files]);
    if (currentTrackIndex === null) {
      setCurrentTrackIndex(0);
    }
  };

  const playNextTrack = () => {
    if (currentTrackIndex !== null && currentTrackIndex < audioFiles.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      // If at the end of the playlist, loop back to the beginning
      setCurrentTrackIndex(0);
    }
  };

  const playPreviousTrack = () => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileUpload} multiple />
      <Player
        audioFiles={audioFiles}
        currentTrackIndex={currentTrackIndex}
        setCurrentTrackIndex={setCurrentTrackIndex}
        onEnded={playNextTrack}
      />
      <Playlist
        audioFiles={audioFiles}
        currentTrackIndex={currentTrackIndex}
        onSelectTrack={(index) => setCurrentTrackIndex(index)}
      />
    </div>
  );
};

export default App;
