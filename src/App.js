import React, { useEffect, useState } from 'react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import SearchInput from './components/SearchInput';
import SongList from './components/SongList';
import axios from 'axios';

function App() {
  const CLIENT_ID = 'ed1870b55dd349cf9c8b9d6ce7c00dc0';
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const [token, setToken] = useState("");
  const [SearchKey, setSearchKey] = useState("");
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

  const searchSongs = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: SearchKey,
        type: "track" //
      }
    });
    setSongs(data.tracks.items || []);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MUSIC API</h1>
        {!token ? (
          <LoginButton authEndpoint={AUTH_ENDPOINT} clientId={CLIENT_ID} redirectUri={REDIRECT_URI} responseType={RESPONSE_TYPE} />
        ) : (
          <LogoutButton onLogout={logout} />
        )}
        {token ? (
          <SearchInput onChange={(e) => setSearchKey(e.target.value)} onSubmit={searchSongs} placeholder="Search Songs" />
        ) : (
          <h1>Hãy đăng nhập</h1>
        )}
        {token && <SongList songs={songs} />}
      </header>
    </div>
  );
}

export default App;
