// Add.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'; // Spinner para feedback visual
import 'bootstrap/dist/css/bootstrap.min.css';
import './add.css'; // Adicione um arquivo CSS para estilizações personalizadas

const Add = ({ token }) => {
  const [book, setBook] = useState({
    title: '', 
    author: '', 
    synopsis: '', 
    link: '', 
    imageLink: '', 
    audience: '',
    arquivo: null,  // Armazenar o arquivo PDF aqui
    visibilidade: 'privado' // Novo estado para visibilidade
  });
  
  const [isLoading, setIsLoading] = useState(false); // Estado para carregar spinner

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'arquivo') {
      // Se o campo for de arquivo, armazena o arquivo
      setBook((prev) => ({ ...prev, arquivo: e.target.files[0] }));
    } else {
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error('Token não encontrado. Por favor, faça login novamente.');
      return;
    }

    try {
      setIsLoading(true); // Iniciar carregamento
      const formData = new FormData();
      formData.append('title', book.title);
      formData.append('author', book.author);
      formData.append('synopsis', book.synopsis);
      formData.append('link', book.link);
      formData.append('imageLink', book.imageLink);
      formData.append('audience', book.audience);
      formData.append('arquivo', book.arquivo);  // Adiciona o arquivo PDF no formData
      formData.append('visibilidade', book.visibilidade); // Adiciona a visibilidade no formData

      await axios.post("http://localhost:3006/api/livros/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'  // Indica que está enviando arquivos
        }
      });

      navigate('/livros');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // Parar carregamento
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '500px', backgroundColor: '#f8f9fa' }}>
        <h1 className="text-center mb-4" style={{ color: '#007bff' }}>Adicionar Novo Livro</h1>
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
            <input
              type="file"
              className="form-control btn btn-info"
              style={{ color: '#fff' }} // Cor mais forte
              onChange={handleChange}
              name="arquivo"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="visibility">Visibilidade:</label>
            <select
              className="form-control"
              name="visibility"
              onChange={handleChange}
              value={book.visibility}
            >
              <option value="privado">Privado</option>
              <option value="publico">Público</option>
            </select>
          </div>
          <button
            className="btn btn-success w-100 mb-3"
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          <button className="btn btn-secondary w-100" onClick={() => navigate('/livros')}>
            Voltar
          </button>
        </div>
        <div className="text-center">
          {isLoading && (
            <ThreeDots
              height="30"
              width="60"
              radius="9"
              color="#007bff"  // Cor azul para combinar com o tema
              ariaLabel="three-dots-loading"
              wrapperStyle={{ margin: '30px auto' }}
              visible={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
