import React from 'react';

import Navbar from './../../components/Navbar/Navbar';

const Home = () => {
  return (
    <div className='home'>
     <Navbar />
      <h1>Bem-vindo ao Sistema de Cadastro de Livros</h1>
      <p>Explore o mundo da leitura e organize seus livros favoritos!</p>
    </div>
  );
};

export default Home;
