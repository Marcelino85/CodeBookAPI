import Navbar from './../../components/Navbar/Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Login = ({ setToken }) => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook para redirecionamento
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      try{

         axios.post('http://localhost:3006/api/users/login', formData)
        .then(response =>{
          
          if (response.status === 200) {
            setToken(response.data.token);
           
            setMessage('Login bem-sucedido!');
          } else {
            setMessage('Erro ao fazer login.');
          }
        })
      }catch(err) {
        document.getElementById("mensage").innerText = 'Erro ao logar usuário: ' + err;
        document.getElementById("mensage").style.color="red";
        console.error('Erro ao registrar usuário:', err);
        setError('Usuário não cadastrado ou senha incorreta');
      };
      await sleep(2000);
      navigate('/livros'); // Redireciona para a página de livros
  };

  return (
    <div>
      <Navbar />

      <h1>Login</h1>

        <div id="mensage"></div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="UserName"
            name="username"
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

          <button type="submit">Entrar</button>
          {error && <p className="error">{error}</p>}
          <button type="button" onClick={() => navigate('/register')}>Registrar-se</button>

        </form>

      {message && <p>{message}</p>}

    </div>
  );
};

export default Login;
