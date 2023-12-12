import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const CLIENT_ID = 'ed1870b55dd349cf9c8b9d6ce7c00dc0';
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  const [token, setToken] = useState("");
  const [SearchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);


  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      // console.log(token);

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, [])

  const logout = () => {
    setToken();
    window.localStorage.removeItem("token");
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: SearchKey,
        type: "artist"
      }
    })
    setArtists(data.artists.items || []); // Ensure data.artists.items is an array
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt='' /> : <div>No images</div>}
        {artist.name}
      </div>
    ));
  }

  const searchSongs = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: SearchKey,
        type: "track" // Set type to "track" for searching songs
      }
    });
    setSongs(data.tracks.items || []); // Ensure data.tracks.items is an array
  };
  const renderSongs = () => {
    return songs.map(song => (
      <div key={song.id}>
        {song.album.images.length ? <img width={"100%"} src={song.album.images[0].url} alt='' /> : <div>No images</div>}
        {song.name} - {song.artists.map(artist => artist.name).join(', ')}
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MUSIC API</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a>
          :
          <button onClick={logout}>Logout</button>
        }
        {token ?
          <form onSubmit={searchSongs}>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />
            <button type='submit'>Search</button>
          </form>
          :
          <h1>Hãy đăng nhập</h1>}
        {renderSongs()}
      </header>
    </div>
  );
}

export default App;
