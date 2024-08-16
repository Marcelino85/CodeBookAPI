import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Add = () => {

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

  const handleClick = async e=>{
    e.preventDefault()

    const token = localStorage.getItem('token');
    
    try{
      await axios.post("http://localhost:3006/api/livros/", book, {
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token JWT no cabeçalho da requisição
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
      <input type="text" placeholder='Titulo' onChange={handleChange} name='title' value={book.title}/>
      <input type="text" placeholder='Autor' onChange={handleChange} name='author'value={book.author}/>
      <input type="text" placeholder='Descrição' onChange={handleChange} name='synopsis'value={book.synopsis}/>
      <input type="text" placeholder='Indicação' onChange={handleChange} name='audience' value={book.audience}/>
      <input type="text" placeholder='Capa' onChange={handleChange} name='imageLink'value={book.imageLink}/>
      <input type="text" placeholder='link' onChange={handleChange} name='link'value={book.link}/>
      <button className='formButton' onClick={handleClick}>Add</button>
      <button className='btn' onClick={() => navigate('/livros')}>Voltar</button>

    </div>
  )
}

export default Add