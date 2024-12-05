// Home.js

import React from 'react';
import Navbar from './../../components/Navbar/Navbar';
import Img from '../../components/Img/CodeBook.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styleHome.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="home" id="home">
        <div className="container-fluid d-flex align-items-center justify-content-between flex-column flex-lg-row">
          <div className="home-text text-center text-lg-start">
            <h4 className="text-h4">Bem-vindo ao Sistema de Cadastro de Livros</h4>
            <h1 className="text-h1">Explore o mundo da leitura e organize seus livros favoritos!</h1>
          </div>
          <div className="home-img mt-4 mt-lg-0">
            <img src={Img} alt="Logo" className="img-fluid" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
