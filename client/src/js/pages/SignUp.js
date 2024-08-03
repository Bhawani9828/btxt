// SignUp.js
import React, { useState } from 'react';

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSignUp(username, avatarUrl);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input placeholder="Avatar URL" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
