import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styleNavBar.css'; // Estilizações personalizadas

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // Estado para controlar o dropdown
  const navigate = useNavigate();

  // Limpa o token ao inicializar o componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      fetchProfilePic(token);
    }
  }, []);

  // Função para buscar a foto de perfil
  const fetchProfilePic = async (token) => {
    try {
      const res = await axios.get('http://localhost:3006/api/users/profile-pic', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      if (res.data.size > 0) {
        const imgURL = URL.createObjectURL(res.data);
        setProfilePic(imgURL);
      }
    } catch (err) {
      console.error('Erro ao buscar a foto de perfil:', err);
    }
  };



  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setProfilePic(null);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <strong>CodeBook</strong>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome className="me-2" /> Home
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
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
              </>
            ) : (
              <li className="nav-item dropdown">
                <span className="nav-link" style={{ cursor: 'pointer' }} onClick={toggleDropdown}>
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Foto de perfil"
                      className="profile-pic"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid white',
                      }}
                    />
                  ) : (
                    <FaUserPlus className="me-2" />
                  )}
                </span>
                {showDropdown && (
                  <div className="dropdown-menu show dropdown-menu-end">
                    <Link className="dropdown-item" to="/profile">Atualizar Foto</Link>
                    <Link className="dropdown-item" to="/livros">Meus Livros</Link>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
