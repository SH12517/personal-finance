// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({onSubmit}) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate('');

  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit(user)
    navigate('/read');
  }

  return (
    <div className=' mt-3 container border border-dark'>
      <h2>Login</h2>
      <form className='form-group' onSubmit={handleLogin}>
        <label>UserName:</label>
        <input 
        className='form-control'
          type="text"
          name='user'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <label>Password:</label>
        <input
          className='form-control'
          type="password"
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' >Login</button>
      </form>
    </div>
  );
}

export default Login;
