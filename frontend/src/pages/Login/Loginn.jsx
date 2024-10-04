// login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import Navbar from './../../components/Navbar/Navbar';
import { ThreeDots } from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-95">
        <div className="card shadow p-4 w-100" style={{ maxWidth: '400px', backgroundColor: '#f0f8ff' }}>
          <h2 className="text-center mb-4" style={{ color: '#006a71' }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                name="email"
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Senha"
                name="password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
              {loading ? "Carregando..." : "Login"}
            </button>
            {error && <p className="text-danger text-center">{error}</p>}
            <button type="button" className="btn btn-link w-100 text-center" onClick={() => navigate('/register')}>Registrar-se</button>
          </form>
          <div className="messageReloader text-center">
            {message && <p>{message}</p>}
            {loading && (
              <ThreeDots
                height="30"
                width="60"
                radius="9"
                color="#006a71"  // Cor alterada para refletir o tema
                ariaLabel="three-dots-loading"
                wrapperStyle={{ margin: '30px auto' }}
                visible={true}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
