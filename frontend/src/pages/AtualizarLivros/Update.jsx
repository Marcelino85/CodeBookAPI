import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

const Update = () => {

  const [book, setBook] = useState({

    title:'',
    author:'',
    descriptions:'',
    indication:'',
    bookCover:'',
    img:'',
  })

  const navgate = useNavigate()
  const location = useLocation()

  const bookId= location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBook((prev)=>({...prev, [e.target.name] : e.target.value}))
  }

  const handleClick = async e=>{
    e.preventDefault()
    try{
      await axios.put("http://localhost:3006/livros/" + bookId, book)
      navgate('/')
    }catch(err){
      console.log (err)
    } 
  }

  console.log(book)

  return (
    <div className='form'>
      <h1>Atualizar o Livro </h1>
      <input type="text" placeholder='Titulo' onChange={handleChange} name='title'/>
      <input type="text" placeholder='Autor' onChange={handleChange} name='author'/>
      <input type="text" placeholder='Descrição' onChange={handleChange} name='descriptions'/>
      <input type="text" placeholder='Indicação' onChange={handleChange} name='indication'/>
      <input type="text" placeholder='Capa' onChange={handleChange} name='bookCover'/>
      <input type="text" placeholder='link' onChange={handleChange} name='img'/>

      <button className='formButton' onClick={handleClick}>Atualizar</button>
    </div>
  )
}

export default Update
