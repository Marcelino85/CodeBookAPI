import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './../../components/Navbar/Navbar';
import './profile.css';


const Profile = ({ token }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null); // Estado para armazenar a foto de perfil
  const navigate = useNavigate();

  useEffect(() => {
    // Função para buscar a foto de perfil do usuário
    const fetchProfilePic = async () => {
      try {
        const res = await axios.get('http://localhost:3006/api/users/profile-pic', {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob', // Recebe a imagem como blob para manipulação correta
        });

        // Converte o blob em uma URL para exibição da imagem
        const imgURL = URL.createObjectURL(res.data);
        setProfilePic(imgURL);
      } catch (err) {
        console.error('Erro ao buscar a foto de perfil:', err);
      }
    };

    fetchProfilePic();
  }, [token]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('profilePic', selectedFile);

      // Envia o formulário com a foto para o servidor
      await axios.post('http://localhost:3006/api/users/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Foto de perfil atualizada com sucesso!');
      
      // Atualiza a exibição da foto sem recarregar a página
      const updatedImgURL = URL.createObjectURL(selectedFile);
      setProfilePic(updatedImgURL);

      // Redireciona ou atualiza a página conforme necessário
      navigate('/profile');
    } catch (err) {
      console.error('Erro ao fazer upload da foto:', err);
      alert('Erro ao fazer upload da foto.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="containerP mt-5">
        <h2 className='titleProfileH2'>Perfil</h2>
        {profilePic ? (
          <div className="mt-3">
            <h4>Foto Atual:</h4>
            <img class='imgProfile' src={profilePic} alt="Foto de perfil" style={{ width: '150px', borderRadius: '50%' }} />
          </div>
        ) : (
          <p className='pProfile'>Nenhuma foto de perfil disponível.</p>
        )}
        <input type="file" onChange={handleFileChange} className="form-control mt-3" />
        <button className="btnP btn-primary mt-2" onClick={handleUpload}>
          {profilePic ? 'Atualizar Foto' : 'Enviar Foto'}
        </button>
      </div>
    </>
  );
};

export default Profile;
