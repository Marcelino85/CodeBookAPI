// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Ícones de navegação
import 'bootstrap/dist/css/bootstrap.min.css';
import './styleNavBar.css'; // Para estilizações customizadas

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <strong>CodeBook</strong>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome className="me-2" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <FaSignInAlt className="me-2" /> Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <FaUserPlus className="me-2" /> Registrar-se
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
