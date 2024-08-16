import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './book.css'

const Books = ({ token }) => {
  const [livros, setLivros] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

 
  console.log("Token recebido no componente Books:", token);

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redireciona para a página de login se o token não estiver presente
    } else {
      const fetchAllBooks = async () => {
        try {
          const res = await axios.get('http://localhost:3006/api/livros', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setLivros(res.data);
          console.log(`AQUI ESTA OS DADDOS DO DATA: ${res.data}`);
        } catch (err) {
          console.log(err);
        }
      };

      fetchAllBooks();
    }
  }, [token, navigate]);

  const handleDelete = async (id) => {
    try {
       axios.delete(`http://localhost:3006/api/livros/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLivros(livros.filter(book => book.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="book-details">
        {selectedBook && (
          
          <div className="book-item">
            <div className="book-image">
              <img src={selectedBook.imageLink} alt={selectedBook.title} />
            </div>
            <div className="book-info">
              <ul>
                <li><strong>Título:</strong> {selectedBook.title}</li>
                <li><strong>Autor:</strong> {selectedBook.author}</li>
                <li><strong>Descriptions:</strong> {selectedBook.synopsis}</li>
                <li><strong>Público:</strong> {selectedBook.audience}</li>
                <li>
                  <button onClick={() => window.open(selectedBook.link, '_blank')}>
                    Saiba mais
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="book-list">
        <h2>Meus Livros</h2>
        {livros.map(book => (
          <div key={book.id} className="book-list-item">
            <span
              className="book-list-title"
              onClick={() => setSelectedBook(book)}
            >
              {book.title}
            </span>
            <button onClick={() => navigate(`/livros/update/${book.id}`)}>Editar</button>
            <button onClick={() => handleDelete(book.id)}>Excluir</button>
          </div>
        ))}
        <button className='btn'  onClick={() => navigate('/livros/add')}>Adicionar Livro</button>
        <button className='btn' onClick={() => navigate('/login')}>Sair</button>
      </div>
    </div>
  );
};

export default Books;