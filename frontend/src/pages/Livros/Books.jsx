import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Books = ({ token }) => {
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

 
  console.log("Token recebido no componente Books:", token);

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redireciona para a página de login se o token não estiver presente
    } else {
      const fetchAllBooks = async () => {
        try {
          const res = await axios.get('http://localhost:3006/livros', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setLivros(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchAllBooks();
    }
  }, [token, navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/livros/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLivros(livros.filter(book => book.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Meus Livros</h1>
      <div className='books'>
        {livros.map(book => (
          <div className="book" key={book.id}>
            {book.bookCover && <img src={book.bookCover} alt='' />}
            <h2>{book.title}</h2>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Descrição:</strong> {book.descriptions}</p>
            <p><strong>Indicação:</strong> {book.indication}</p>

            <button className="delete" onClick={() => handleDelete(book.id)}>Deletar</button>
            <button className="update"><Link to={`/update/${book.id}`}>Atualizar</Link></button>
          </div>
        ))}
      </div>
      <button className='btn'><Link to={"/add"}>Adicionar Novo Livro</Link></button>
    </div>
  );
};

export default Books;
