import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = ({ token }) => {
  const [book, setBook] = useState({
    title: '', 
    author: '', 
    synopsis: '', 
    link: '', 
    imageLink: '', 
    audience: '',
    arquivo: null  // Armazenar o arquivo PDF aqui
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.name === 'arquivo') {
      // Se o campo for de arquivo, armazena o arquivo
      setBook((prev) => ({ ...prev, arquivo: e.target.files[0] }));
    } else {
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  const handleClick = async (e) => {
    e.preventDefault()

    if (!token) {
      console.error('Token não encontrado. Por favor, faça login novamente.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', book.title);
      formData.append('author', book.author);
      formData.append('synopsis', book.synopsis);
      formData.append('link', book.link);
      formData.append('imageLink', book.imageLink);
      formData.append('audience', book.audience);
      formData.append('arquivo', book.arquivo);  // Adiciona o arquivo PDF no formData

      await axios.post("http://localhost:3006/api/livros/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'  // Indica que está enviando arquivos
        }
      });

      navigate('/livros');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='form'>
      <h1>Adicionar Novo Livro</h1>
      <div className="content">
        <input type="text" placeholder='Titulo' onChange={handleChange} name='title' value={book.title}/><p/>
        <input type="text" placeholder='Autor' onChange={handleChange} name='author' value={book.author}/><p/>
        <textarea rows="4" cols="50" placeholder='Descrição' onChange={handleChange} name='synopsis' value={book.synopsis}/><p/>
        <input type="text" placeholder='Indicação' onChange={handleChange} name='audience' value={book.audience}/><p/>
        <input type="text" placeholder='Capa' onChange={handleChange} name='imageLink' value={book.imageLink}/><p/>
        <input type="text" placeholder='link' onChange={handleChange} name='link' value={book.link}/><p/>
        <input type="file" onChange={handleChange} name='arquivo' /><p/> {/* Input para PDF */}
        <button className='formButton' onClick={handleClick}>Cadastrar</button>
        <button className='btn' onClick={() => navigate('/livros')}>Voltar</button>
      </div>
    </div>
  )
}

export default Add;
