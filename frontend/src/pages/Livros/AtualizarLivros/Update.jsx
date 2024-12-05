import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Update = () => {
  const [book, setBook] = useState(null); // Inicializa com `null` para verificar o carregamento
  const navigate = useNavigate();
  const { bookId } = useParams(); // Obtém o ID do livro dos parâmetros da URL

  // Função para buscar os dados do livro ao carregar o componente
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3006/api/livros/${bookId}`);
        console.log('Dados do livro carregados:', response.data); // Verificar dados recebidos
        setBook(response.data); // Atualiza o estado com os dados do banco
      } catch (err) {
        console.error('Erro ao buscar o livro:', err);
      }
    };
    fetchBook();
  }, [bookId]);

  // Função para atualizar o estado conforme os campos são alterados
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: name === 'arquivo' ? files[0] : value // Atualiza `arquivo` somente se for selecionado
    }));
  };

  // Função para enviar as atualizações ao backend
  const handleClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const formData = new FormData();
      for (let key in book) {
        if (book[key] !== null) formData.append(key, book[key]); // Adiciona campo somente se não for `null`
      }

      await axios.put(`http://localhost:3006/api/livros/update/${bookId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/livros');
    } catch (err) {
      console.log('Erro ao atualizar o livro:', err.response?.data || err.message);
    }
  };

  // Exibe "Carregando" enquanto os dados do livro ainda não foram carregados
  if (!book) {
    return <div>Carregando dados do livro...</div>;
  }

  // Renderização do formulário com os dados do livro preenchidos
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
              value={book.title} // Exibe o título atual do livro
              required
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="file"
              className="form-control btn btn-info"
              style={{ color: '#000' }}
              onChange={handleChange}
              name="arquivo"
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
