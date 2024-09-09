import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Add = ({ token }) => {

  const [book, setBook] = useState({

    title: '', 
    author: '', 
    synopsis: '', 
    link: '', 
    imageLink: '', 
    audience: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setBook((prev)=>({...prev, [e.target.name] : e.target.value}))
  }
  //tentar colocar um useEffect
  const handleClick = async (e) => {
    e.preventDefault()

      // Verifica se o token está disponível
      if (!token) {
        console.error('Token não encontrado. Por favor, faça login novamente.');
        return;
      }
    
    try{
      await axios.post("http://localhost:3006/api/livros/add", book, {
        headers: {
          Authorization: `Bearer ${token}` // Inclui o token JWT no cabeçalho da requisição
        },
      })
      navigate('/livros')
    }catch(err){
      console.log (err)
    } 
  }

  console.log(book)

  return (
    <div className='form'>
      <h1>Adicionar Novo Livro</h1>
        <div className="content">
          <input type="text" placeholder='Titulo' onChange={handleChange} name='title' value={book.title}/><p/>
          <input type="text" placeholder='Autor' onChange={handleChange} name='author'value={book.author}/><p/>
          <textarea rows="4" cols="50" placeholder='Descrição' onChange={handleChange} name='synopsis'value={book.synopsis}/><p/>
          <input type="text" placeholder='Indicação' onChange={handleChange} name='audience' value={book.audience}/><p/>
          <input type="text" placeholder='Capa' onChange={handleChange} name='imageLink'value={book.imageLink}/><p/>
          <input type="text" placeholder='link' onChange={handleChange} name='link'value={book.link}/><p/>
          <button className='formButton' onClick={handleClick}>Cadastrar</button>
          <button className='btn' onClick={() => navigate('/livros')}>Voltar</button>
        </div>

    </div>
  )
}

export default Add