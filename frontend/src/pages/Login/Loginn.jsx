// login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import Navbar from './../../components/Navbar/Navbar';
import { ThreeDots } from 'react-loader-spinner';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Por favor, insira um e-mail válido.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3006/api/users/login', formData);
      
      if (response.status === 200) {
        setToken(response.data.token);
        setMessage('Login bem-sucedido!');
        await sleep(1000);
        navigate('/livros');
      } else {
        setMessage('Erro ao fazer login.');
      }
    } catch (err) {
      setError('Usuário não cadastrado ou senha incorreta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={formData.username}
            onChange={handleChange}
            placeholder="email"
            name="email"
            required
          />
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            name="password"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Login"}
          </button>
          {error && <p className="error">{error}</p>}
          <button type="button" onClick={() => navigate('/register')}>Registrar-se</button>
        </form>
        <div className='messageReloader'>
          {message && <p>{message}</p>}
          {loading && (
            <ThreeDots
              height="30"
              width="60"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ margin: '30px auto' }}
              visible={true}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
