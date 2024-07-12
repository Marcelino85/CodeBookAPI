import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    console.log('Tentando registrar com:', { username, password });
    try {
      const response = await axios.post('http://localhost:3006/api/users/register', { username, password });
      console.log('Resposta do servidor:', response.data);
      setSuccess('Usuário registrado com sucesso! Você pode fazer login agora.');
      setTimeout(() => navigate('/login'), 3000); // Redirecionar após 3 segundos
    } catch (error) {
      console.error('Erro ao registrar:', error.response?.data?.error || error.message);
      setError(error.response?.data?.error || 'Erro ao registrar. Por favor, tente novamente.');
    }
  };

  return (
    <div className='containerRegister'>
      <h1>Registrar-se</h1>
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
        <button type="submit">Registrar</button><br />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button onClick={() => navigate('/login')}>Já tem uma conta? Faça login</button>
      </form>
    </div>
  );
};

export default Register;
