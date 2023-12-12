import React from 'react';

const SongList = ({ songs }) => (
  <div>
    {songs.map(song => (
      <div key={song.id}>
        {song.name} - {song.artists.map(artist => artist.name).join(', ')}
      </div>
    ))}
  </div>
);

export default SongList;
