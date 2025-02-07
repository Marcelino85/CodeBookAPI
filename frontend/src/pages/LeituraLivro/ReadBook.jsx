import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './../../components/Navbar/Navbar';
import './readBook.css';

const ReadBook = ({ token }) => {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!token) {
          console.error('Token não encontrado! Por favor, faça login.');
          return;
        }

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/livros/read/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        });

        // Cria a URL temporária para exibir o PDF
        const fileURL = URL.createObjectURL(res.data);
        setBookData(fileURL);
      } catch (err) {
        console.error('Erro ao buscar o livro PDF:', err);
      }
    };

    fetchBook();
  }, [id, token]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleBackClick = () => {
    navigate('/livros');
  };

  return (
    <>
      <Navbar />
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <div className="progress-container">
          <div className='containerBtn'>
            <button className='btnRead' onClick={toggleDarkMode}>
              {darkMode ? 'Modo Claro' : 'Modo Escuro'}
            </button>
            <button className='btnRead' onClick={handleBackClick} style={{ marginLeft: '10px' }}>
              Voltar para livros
            </button>
          </div>
        </div>


        {bookData ? (
          <iframe
            src={bookData}
            title="PDF Viewer"
            width="100%"
            height="600px"
            style={{ border: 'none' }}
          ></iframe>
        ) : (
          <div>Carregando PDF...</div>
        )}

        
      </div>
    </>
  );
};

export default ReadBook;
