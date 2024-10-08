import React from 'react';
import { Link } from 'react-router-dom';
import './styleNavBar.css';

const Navbar = () => {
  return (
    
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Registrar-se</Link></li>
        </ul>
      </nav>
    
  );
};

export default Navbar;
