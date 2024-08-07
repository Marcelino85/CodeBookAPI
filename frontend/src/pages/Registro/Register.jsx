import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './../../components/Navbar/Navbar';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:3006/api/users/register', formData);
      setMessage(response.data.message || 'Registrado com sucesso');
      await sleep(5000);
      navigate('/login');
    } catch (err) {
      setMessage('Erro ao registrar usuário: ' + err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Registre-se</h2>
      {message && <div id="mensagem" style={{ color: message.startsWith('Erro') ? 'red' : 'green' }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        /><br></br>
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate('/login')}>Já tem uma conta? Faça login</button>
      </form>
    </div>
  );
};

export default Register;
