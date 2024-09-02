import React from 'react';
import Navbar from './../../components/Navbar/Navbar';
import Img from '../../components/Img/CodeBook.png'
import './styleHome.css'
const Home = () => {
  return (
    <>
      <Navbar />
    <section className="home" id="home">

    <div className='home-text'>

      <h4 className="text-h4">Bem-vindo ao Sistema de Cadastro de Livros</h4>
      <h1 className="text-h1">Explore o mundo da leitura e organize seus livros favoritos!</h1>

    </div>

    <div className="home-img">
            <img src={Img} alt="Logo"/>

    </div>

    </section>
    </>
  );
};

export default Home;
