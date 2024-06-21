import React from 'react'
import { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios'

const Books = () => {
  
    const [livro,setLivro] = useState([])

    useEffect(()=>{
      const fecthAllBooks = async ()=>{
        try{
          const res = await axios.get("http://localhost:3006/livros")
          console.log(res)
        }catch(err){
          console.log(err)
        }
      }

      fecthAllBooks()

    },[])
  
  return (
    <div>
      Books
    </div>
  )
}

export default Books;
