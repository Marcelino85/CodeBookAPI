import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Tentando fazer login com:', { username, password });
    try {
      const response = await axios.post('http://localhost:3006/api/users/login', { username, password });
      console.log('Resposta do servidor:', response.data);
      setToken(response.data.token);
      navigate('/livros');

      
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Erro ao fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <div className='containerLogin'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Entrar</button><br />
        {error && <p className="error">{error}</p>}
        <button onClick={() => navigate('/register')}>Registrar-se</button>
      </form>
    </div>
  );
};

export default Login;
