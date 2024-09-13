import Navbar from './../../components/Navbar/Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css"
import {ThreeDots} from 'react-loader-spinner'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Login = ({ setToken }) => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook para redirecionamento
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      setLoading(true);

      try{
         axios.post('http://localhost:3006/api/users/login', formData)
        .then(response =>{
          
          if (response.status === 200) {
            setToken(response.data.token);
           
            setMessage('Login bem-sucedido!');
            setLoading(true);
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
      setLoading(false);
      await sleep(1000);
      navigate('/livros'); // Redireciona para a página de livros
  };

  return (
    <>
    <Navbar />
    <div className="container">

      <h2>Login</h2>

      {/* {message && <div id="mensage" style={{ color: message.startsWith('Erro') ? 'red' : 'green' }}>{message}</div>} */}

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
         
          <button type="submit" disabled={loading}>{loading ? "Carregando..." : "Login"}</button>
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
              wrapperStyle={{margin: '30px auto'}}
              wrapperClassName=""
              visible={true}
            />)}

        </div>
    </div>
    </>
  );
};

export default Login;
