// src/components/Player.js
import React, { useState, useRef, useEffect } from 'react';

const Player = ({ audioFiles, currentTrackIndex, onEnded, onPrevious, setCurrentTrackIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(new Audio());
  const objectURLs = useRef([]);

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrackHandler = () => {
    if (currentTrackIndex !== null && currentTrackIndex < audioFiles.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      // If at the end of the playlist, loop back to the beginning
      setCurrentTrackIndex(0);
    }
  };

  const prevTrackHandler = () => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    } else if (onPrevious) {
      onPrevious();
    }
  };

  const handleTrackEnded = () => {
    if (onEnded) {
      onEnded();
    } else {
      nextTrackHandler();
    }
  };

  useEffect(() => {
    if (currentTrackIndex !== null) {
      setCurrentTrack(audioFiles[currentTrackIndex]);

      // Revoke the previous object URLs to prevent memory leaks
      objectURLs.current.forEach(URL.revokeObjectURL);

      // Create object URLs for the audio files
      const urls = audioFiles.map(file => URL.createObjectURL(file));
      objectURLs.current = urls;

      audioRef.current.src = urls[currentTrackIndex];
      audioRef.current.currentTime = 0; // Reset to the beginning

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [audioFiles, currentTrackIndex, isPlaying]);

  useEffect(() => {
    audioRef.current.addEventListener('ended', handleTrackEnded);

    return () => {
      audioRef.current.removeEventListener('ended', handleTrackEnded);
    };
  }, [handleTrackEnded]);

  // Save the last playing audio file index to localStorage
  useEffect(() => {
    localStorage.setItem('lastPlayedIndex', currentTrackIndex);
  }, [currentTrackIndex]);

  return (
    <div>
      {currentTrack ? (
        <div>
          <h3>Now Playing: {currentTrack.name}</h3>
          <div>
            <button onClick={prevTrackHandler}>Previous</button>
            <button onClick={playPauseHandler}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={nextTrackHandler}>Next</button>
          </div>
        </div>
      ) : (
        <p>No audio files available.</p>
      )}
    </div>
  );
};

export default Player;
