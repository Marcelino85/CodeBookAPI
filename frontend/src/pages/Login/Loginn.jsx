import Navbar from './../../components/Navbar/Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3006/api/users/login', formData);
      if (response.data.token) {
        setToken(response.data.token);
        setMessage('Login bem-sucedido!');
        navigate('/livros'); // Redireciona para a página de livros
      } else {
        setMessage('Erro ao fazer login.');
      }
    } catch (error) {
      console.error('Error logging in user', error);
      setMessage('Erro ao fazer login.');
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="UserName"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/register')}>Registrar-se</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
