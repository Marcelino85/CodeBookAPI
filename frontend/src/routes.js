import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Loginn';
import Register from './pages/Registro/Register';
import Home from './pages/Home/Home';
import Books from './pages/Livros/Books';
import Update from './pages/Livros/AtualizarLivros/Update'
import Add from './pages/AdcionarLivros/Add';
import LeituraLivro from './pages/LeituraLivro/ReadBook';
import ProfileImg from './components/ProfileImg/profile'; // Importar o novo componente


 export const MyRoutes = ()=>{

    const [token, setToken] = useState('');    

    // Carregar o token do localStorage quando o App é montado
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);
  
     // Função para atualizar o token e armazená-lo no localStorage
     const handleSetToken = (newToken) => {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    }; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={handleSetToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/livros" element={<Books token={token} />} />
        <Route path="/livros/update/:bookId" element={<Update token={token} />} />
        <Route path="/livros/add" element={<Add token={token}/>} />
        <Route path="/livros/read/:id" element={<LeituraLivro token={token}/>} />
        <Route path="/profile" element={<ProfileImg token={token} />} /> {/* Nova rota */}
        
      </Routes>
    </Router>
  )
}

export default MyRoutes; 

