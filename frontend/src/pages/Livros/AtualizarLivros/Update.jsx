// Update.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Update = () => {
  const [book, setBook] = useState({
    title: '', 
    author: '', 
    synopsis: '', 
    link: '', 
    imageLink: '', 
    audience: '',
    visibilidade: 'privado' // Inicializa como privado
  });

  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    if (!bookId) {
      console.error('bookId está indefinido');
      return;
    }

    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3006/api/livros/${bookId}`);
        setBook(response.data); // Atualiza o estado com os dados do livro
      } catch (err) {
        console.error('Erro ao buscar o livro:', err);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log('Dados para atualizar:', { bookId, book });

    const token = localStorage.getItem('token'); // Pega o token JWT armazenado no localStorage
    try {
      await axios.put(`http://localhost:3006/api/livros/update/${bookId}`, book, {
        headers: {
          Authorization: `Bearer ${token}` // Inclui o token no cabeçalho da requisição
        }
      });
      navigate('/livros');
    } catch (err) {
      console.log('Erro ao atualizar o livro:', err.response?.data || err.message);
    } 
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '500px', backgroundColor: '#f8f9fa' }}>
        <h1 className="text-center mb-4" style={{ color: '#007bff' }}>Atualizar o Livro</h1>
        <div className="content">
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Título"
              onChange={handleChange}
              name="title"
              value={book.title}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Autor"
              onChange={handleChange}
              name="author"
              value={book.author}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Indicação"
              onChange={handleChange}
              name="audience"
              value={book.audience}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Capa (link da imagem)"
              onChange={handleChange}
              name="imageLink"
              value={book.imageLink}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Link do Livro"
              onChange={handleChange}
              name="link"
              value={book.link}
              required
            />
          </div>
          <div className="form-group mb-3">
            <textarea
              rows="4"
              className="form-control fixed-textarea"
              placeholder="Descrição"
              onChange={handleChange}
              name="synopsis"
              value={book.synopsis}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="visibilidade">Visibilidade:</label>
            <select
              className="form-control"
              name="visibilidade"
              onChange={handleChange}
              value={book.visibilidade}
            >
              <option value="privado">Privado</option>
              <option value="publico">Público</option>
            </select>
          </div>
          <button
            className="btn btn-success w-100 mb-3"
            onClick={handleClick}
          >
            Atualizar
          </button>
          <button
            className="btn btn-secondary w-100"
            onClick={() => navigate('/livros')}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
