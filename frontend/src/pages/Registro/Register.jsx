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
        const status = axios.post('http://localhost:3006/api/users/register', formData)
        .then(response => {
            if (response.data.message) {
                document.getElementById("mensagem").innerText = response.data.message;
                document.getElementById("mensagem").style.color="green";
                return response.status;
            }       
        })
        .catch(err => {
            document.getElementById("mensagem").innerText = 'Erro ao registrar usuário:' + err;
            document.getElementById("mensagem").style.color="red";
            console.error('Erro ao registrar usuário:', err);
        });
        await sleep(5000);
        navigate('/login');  
        
        // if(status == 201){
        //     await sleep(5000); // Pausa por 5 segundos de forma assíncrona
        //     navigate('/login');              
        // }
    };

    return (
       
        <div>
          <Navbar />
          <h1>Registre-se</h1>
          <div id="mensagem"></div>
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
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
