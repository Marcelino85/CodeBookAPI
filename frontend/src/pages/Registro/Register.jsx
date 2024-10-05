// Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './../../components/Navbar/Navbar';
import { ThreeDots } from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./register.css";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // Estado para verificar se a mensagem é de erro ou sucesso
  const [isLoading, setIsLoading] = useState(false); // Estado para exibir carregamento
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

    // Validação para senhas correspondentes
    if (formData.password !== formData.confirmPassword) {
      setMessage('As senhas não coincidem.');
      setIsError(true);
      return;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage('Por favor, insira um e-mail válido.');
      setIsError(true);
      return;
    }
    if (formData.password.length < 6) {
      setMessage('A senha deve ter no mínimo 6 caracteres.');
      setIsError(true);
      return;
    }
    setMessage('');
    setIsError(false);

    try {
      setIsLoading(true); // Iniciar carregamento
      const response = await axios.post('http://localhost:3006/api/users/register', formData);

      if (response.status === 201) {
        const { token } = response.data;
        localStorage.removeItem('token'); // Remover token anterior, se existir
        localStorage.setItem('token', token); // Salvar o token

        setMessage('Registrado com sucesso!');
        setIsError(false);
        await sleep(1000); // Pequena pausa antes de redirecionar
        navigate(`/livros`); // Redirecionar para a página de login
      }

    } catch (err) {
      setMessage('Erro ao registrar usuário: ' + err.response?.data?.message || 'Erro inesperado.');
      setIsError(true);
    } finally {
      setIsLoading(false); // Parar carregamento
    }
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-90">
        <div className="card shadow p-4 w-100" style={{ maxWidth: '400px', backgroundColor: '#f0f8ff' }}>
          <h2 className="text-center mb-4" style={{ color: '#006a71' }}>Registre-se</h2>
          {message && (
            <div
              id="mensagem"
              className="text-center mb-3"
              style={{ color: isError ? 'red' : 'green' }}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Nome"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={isLoading}>
              {isLoading ? 'Registrando...' : 'Registrar'}
            </button>
            <button type="button" className="btn btn-link w-100 text-center" onClick={() => navigate('/login')}>
              Já tem uma conta? Faça login
            </button>
          </form>
          <div className="text-center">
            {isLoading && (
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

export default Register;
