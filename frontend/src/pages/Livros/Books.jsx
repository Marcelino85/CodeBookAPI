import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './../../components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o Bootstrap
import './book.css';

// Adicionando um modal simples para exibição dos detalhes do livro
const BookModal = ({ book, onClose, navigate }) => {
  if (!book) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className='imgdiv'>
         <img src={book.imageLink} alt={book.title} />
        </div>
        
        <h2>
          {book.title}
          <span className={`badge ${book.visibilidade === 'publico' ? 'badge-publico' : 'badge-privado'}`}>
            {book.visibilidade === 'publico' ? 'Público' : 'Privado'}
          </span>
        </h2>
        <p><strong>Autor:</strong> {book.author}</p>
        <p><strong>Público:</strong> {book.audience}</p>
        <div className="description-container">
          <p><strong>Descrição:</strong> {book.synopsis}</p>
        </div>

        <div className='modalButton'>
          <button onClick={() => window.open(book.link, '_blank')}>Saiba mais</button>
          <button onClick={() => window.open(`/livros/read/${book.id}`, '_blank')}>Ler Livro</button>
          <button onClick={() => onClose()}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

const Books = ({ token }) => {
  const [livros, setLivros] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual
  const [booksPerPage] = useState(3); // Quantidade de livros por página
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

  // Lógica de Paginação
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = livros.slice(indexOfFirstBook, indexOfLastBook);

  // Mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este livro?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3006/api/livros/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLivros(livros.filter(book => book.id !== id));
      } catch (err) {
        console.log(err);
      }
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
        <div className="row">
          <div className="colBtnItem">
            <h2><strong>Meus Livros</strong></h2>
            {currentBooks.map(book => (
                <div key={book.id} className="book-list-item">
                  <div className="book-list-title" onClick={() => setSelectedBook(book)}>
                    {book.title}
                    <span className={`badge ${book.visibilidade === 'publico' ? 'badge-publico' : 'badge-privado'}`}>
                      {book.visibilidade === 'publico' ? 'Público' : 'Privado'}
                    </span>
                  </div>
                  <div className='btnEdt-Exc'>
                    <button className="btn btn-warning btn-sm" onClick={() => navigate(`/livros/update/${book.id}`)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => {handleDelete(book.id)}}>Excluir</button>
                  </div>
                </div>
              ))
            }

            <button className="btn btn-primary mt-3" onClick={() => navigate('/livros/add')}>Adicionar Livro</button>
            <button className="btn btn-secondary mt-3" onClick={handleLogout}>Sair</button>

            {/* Paginação */}
            <Pagination
              booksPerPage={booksPerPage}
              totalBooks={livros.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>

      {/* Exibe o modal se um livro estiver selecionado */}
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} navigate={navigate} />
    </>
  );
};

// Componente de Paginação
const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center mt-4">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Books;
