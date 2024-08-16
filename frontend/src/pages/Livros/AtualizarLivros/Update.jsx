import React from 'react'
import { useState, useEffect  } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
// import {useLocation} from 'react-router-dom'

const Update = () => {
 
  const [book, setBook] = useState({
    
    title: '', 
    author: '', 
    synopsis: '', 
    link: '', 
    imageLink: '', 
    audience: ''
  })

  const navigate = useNavigate()
  const { bookId } = useParams();

  // const location = useLocation()
  // const bookId= location.pathname.split("/")[2]

  useEffect(() => {
      // Verificação adicional para garantir que bookId está definido
    if (!bookId) {
      console.error('bookId está indefinido');
      return;
    }


    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3006/api/livros/${bookId}`);
        setBook(response.data); // Atualiza o estado com os dados do livro
      } catch (err) {
        console.error('Erro ao buscar o livro:', err);
      }
    };
    fetchBook();
  }, [bookId]);

 
  const handleChange = (e) => {
    setBook((prev)=>({...prev, [e.target.name] : e.target.value}))
  }

  const handleClick = async (e)=>{
    e.preventDefault()
    console.log('Dados para atualizar:', { bookId, book });

    const token = localStorage.getItem('token'); // Pega o token JWT armazenado no localStorage
    try{
      await axios.put(`http://localhost:3006/api/livros/${bookId}`, book,{
        headers: {
          Authorization: `Bearer ${token}` // Inclui o token no cabeçalho da requisição
        }
      })
      navigate('/livros')
     
    }catch(err){
      console.log ('Erro ao atualizar o livro:', err.response?.data || err.message)
    } 
  }

  
    return (
      <div className='form'>
      <h1>Atualizar o Livro </h1>
      <input type="text" placeholder='Titulo' onChange={handleChange} name='title' value={book.title}/> <br></br>
      <input type="text" placeholder='Autor' onChange={handleChange} name='author'value={book.author}/> <br></br>
      <input type="text" placeholder='Indicação' onChange={handleChange} name='audience' value={book.audience}/><br></br>
      <input type="text" placeholder='Capa' onChange={handleChange} name='imageLink' value={book.imageLink}/><br></br>
      <input type="text" placeholder='link' onChange={handleChange} name='link' value={book.link}/><br></br>
      <textarea type="text" placeholder='Descrição' onChange={handleChange} name='synopsis' value={book.synopsis}/><br></br>
      
      <button className='formButton' onClick={handleClick}>Atualizar</button>
      <button className='btn' onClick={() => navigate('/livros')}>Voltar</button>
      </div>
    )
  }

export default Update