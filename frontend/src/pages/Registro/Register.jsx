import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './../../components/Navbar/Navbar';
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
        navigate('/login'); // Redirecionar para a página de login
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
      <div className='container'>
        <h2>Registre-se</h2>
        {message && (
          <div
            id="mensagem"
            style={{ color: isError ? 'red' : 'green' }}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          /><br />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrar'}
          </button>
          <button type="button" onClick={() => navigate('/login')}>
            Já tem uma conta? Faça login
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;

