import React from 'react'
import { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Books = () => {
  
    const [livros,setLivros] = useState([])

    useEffect(()=>{
      const fecthAllBooks = async ()=>{
        try{
          const res = await axios.get("http://localhost:3006/livros")
          setLivros(res.data)
          console.log(res.data)
        }catch(err){
          console.log(err)
        }
      }

      fecthAllBooks()

    },[])
  
  return (
    <div>
      <h1>Meus Livros</h1>
      <div className='books'>
        {livros.map(book=>(
          <div className="book" key={book.id}>
            {book.bookCover && <img src={book.bookCover} alt=''/>}
            <h2>{book.title}</h2>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Descrição:</strong> {book.descriptions}</p>
            <p><strong>Indicação:</strong> {book.indication}</p>
            
           
            

          </div>
        ))}
      </div>

        <button><Link to={"/add"}>Add New Book</Link></button>

    </div>
  )
}

export default Books;
