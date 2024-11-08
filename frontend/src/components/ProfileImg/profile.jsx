import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({ token }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

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

      await axios.post('http://localhost:3006/api/users/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Foto de perfil atualizada com sucesso!');
      navigate('/');
    } catch (err) {
      console.error('Erro ao fazer upload da foto:', err);
      alert('Erro ao fazer upload da foto.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload de Foto de Perfil</h2>
      <input type="file" onChange={handleFileChange} />
      <button className="btn btn-primary mt-2" onClick={handleUpload}>
        Enviar Foto
      </button>
    </div>
  );
};

export default Profile;
