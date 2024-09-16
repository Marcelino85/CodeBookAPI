// register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './../../components/Navbar/Navbar';
import "./register.css";

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

  const validateForm = () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage('Por favor, insira um e-mail válido.');
      return false;
    }
    if (formData.password.length < 6) {
      setMessage('A senha deve ter no mínimo 6 caracteres.');
      return false;
    }
    setMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:3006/api/users/register', formData);
      setMessage(response.data.message || 'Registrado com sucesso');
      setTimeout(() => {
        navigate('/livros');
      }, 2000);
    } catch (err) {
      setMessage('Erro ao registrar usuário: ' + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className='container'>
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          /><br />
          <button type="submit">Register</button>
          <button type="button" onClick={() => navigate('/login')}>Já tem uma conta? Faça login</button>
        </form>
      </div>
    </>
  );
};

export default Register;
