import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Loginn';
import Register from './pages/Registro/Register';
import Home from './pages/Home/Home';
import Books from './pages/Livros/Books';
import Update from './pages/Livros/AtualizarLivros/Update'
import Add from './pages/AdcionarLivros/Add';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/livros" element={<Books token={token} />} />
        <Route path="/livros/update/:bookId" element={<Update />} />
        <Route path="/livros/add" element={<Add />} />
      </Routes>
    </Router>
  );
};

export default App;
