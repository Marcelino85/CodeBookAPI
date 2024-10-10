import React from 'react';
import axios from 'axios';
import MyRoutes from "./routes";

const App = () => {
 // Configurar interceptor Axios fora do useEffect
 axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {

      // Armazena a mensagem no localStorage ou em uma variável global
      localStorage.setItem('sessionExpiredMessage', 'Sua sessão expirou. Por favor, faça login novamente.');

      // Redirecionar para a tela de login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

return (
   <MyRoutes />
  );
};

export default App;