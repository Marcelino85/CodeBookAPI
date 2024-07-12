import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Books from "./pages/Livros/Books";
import Add from "./pages/AdcionarLivros/Add";
import Update from "./pages/AtualizarLivros/Update";
import './App.css'
import Login from "./pages/Login/Loginn";
import Register from './pages/Registro/Register';




function App() {

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={handleSetToken}/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/livros" element={token ? <Books token={token} /> : <Navigate to="/login" />} />
        <Route path="/add" element={token ? <Add token={token} /> : <Navigate to="/login" />} />
        <Route path="/add" element={token ? <Update token={token} /> : <Navigate to="/login" />} />
       
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
