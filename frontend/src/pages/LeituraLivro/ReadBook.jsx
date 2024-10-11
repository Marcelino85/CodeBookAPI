import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Para capturar o ID da URL
import Navbar from './../../components/Navbar/Navbar';
import './readBook.css';

const ReadBook = ({ token }) => {
  const { id } = useParams(); // Captura o ID do livro na URL
  const [bookData, setBookData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate(); // Hook para navegação
 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!token) {
          console.error('Token não encontrado! Por favor, faça login.');
          return;
        }

        const res = await axios.get(`http://localhost:3006/api/livros/read/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
          },
          responseType: 'blob', // O arquivo será retornado como blob (PDF)
        });

        // Cria a URL temporária para exibir o PDF
        const fileURL = URL.createObjectURL(res.data);
        setBookData(fileURL); // Armazena a URL do PDF
      } catch (err) {
        console.error('Erro ao buscar o livro PDF:', err);
      }
    };

    fetchBook();
  }, [id, token]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    setProgress(newProgress);
    // Lógica para salvar o progresso no backend pode ser adicionada aqui
  };

  const handleBackClick = () => {
    navigate('/livros'); // Redireciona para a página de livros
  };

  return (
    <>
    <Navbar />
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>

      <button onClick={handleBackClick} style={{ marginLeft: '10px' }}>
        Voltar para Livros
      </button>

      {bookData && (
        <iframe
        src={bookData}
        title="PDF Viewer"
        width="100%"
          height="600px"
          style={{ border: 'none' }}
          ></iframe>
        )}

      <div className="progress-container">
        <label>Progresso de Leitura:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
        />
        <span>{progress}%</span>
      </div>
    </div>
          </>
  );
};

export default ReadBook;
