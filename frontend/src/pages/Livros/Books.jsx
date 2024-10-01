import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './../../components/Navbar/Navbar';
import './book.css';

// Adicionando um modal simples para exibição dos detalhes do livro
const BookModal = ({ book, onClose, navigate }) => {
  if (!book) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={book.imageLink} alt={book.title} />
        <h2>{book.title}</h2>
        <p><strong>Autor:</strong> {book.author}</p>
        <p><strong>Descrição:</strong> {book.synopsis}</p>
        <p><strong>Público:</strong> {book.audience}</p>
        <button onClick={() => window.open(book.link, '_blank')}>Saiba mais</button>
        <button onClick={() => onClose()}>Fechar</button>
        {/* Navegação corrigida */}
        <button onClick={() => navigate(`/livros/read/${book.id}`)}>Ler Livro</button>
      </div>
    </div>
  );
};

const Books = ({ token }) => {
  const [livros, setLivros] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      const fetchAllBooks = async () => {
        try {
          const res = await axios.get('http://localhost:3006/api/livros', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setLivros(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchAllBooks();
    }
  }, [token, navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/api/livros/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLivros(livros.filter(book => book.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="book-list">
          <h2>Meus Livros</h2>
          {livros.map(book => (
            <div key={book.id} className="book-list-item">
              <span className="book-list-title" onClick={() => setSelectedBook(book)}>
                {book.title}
              </span>
              <button onClick={() => navigate(`/livros/update/${book.id}`)}>Editar</button>
              <button onClick={() => handleDelete(book.id)}>Excluir</button>
            </div>
          ))}
          <button className="btn" onClick={() => navigate('/livros/add')}>Adicionar Livro</button>
          <button className="btn" onClick={handleLogout}>Sair</button>
        </div>
      </div>

      {/* Exibe o modal se um livro estiver selecionado, passando navigate como prop */}
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} navigate={navigate} />
    </>
  );
};

export default Books;
