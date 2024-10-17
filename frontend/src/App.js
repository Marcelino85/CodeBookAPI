import React from 'react';
import axios from 'axios';
import MyRoutes from "./routes";

// Interceptor para adicionar token automaticamente
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token em todas as requisições
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para capturar respostas de erro
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      // Verifique se o erro é devido a um token expirado especificamente
      const errorMessage = error.response.data.message;
      if (errorMessage === 'Token expirado' || errorMessage === 'jwt expired' || errorMessage === 'Token inválido.') {
        // Armazena a mensagem no localStorage ou em uma variável global
        localStorage.setItem('sessionExpiredMessage', 'Sua sessão expirou. Por favor, faça login novamente.');

        // Redirecionar para a tela de login
        window.location.href = '/login';
      }

      // Certifique-se de que a requisição não esteja em um loop
      if (!originalRequest._retry) {
        originalRequest._retry = true; // Marca a requisição para evitar loop infinito
        return Promise.reject(error); // Rejeita se não for devido ao token
      }
    }

    // Rejeitar todas as outras respostas de erro normalmente
    return Promise.reject(error);
  }
);

const App = () => {
  return (
    <MyRoutes />
  );
};

export default App;
