import React from 'react';

const LoginButton = ({ authEndpoint, clientId, redirectUri, responseType }) => (
  <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}>Login</a>
);

export default LoginButton;
