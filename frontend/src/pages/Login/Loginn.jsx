import React from 'react'
import './login.css'
const Login = () => {
  return (
    <div className='containerLogin'>

        <form action="">
        <p>Login: <input type="email" placeholder='email' /></p>
        <p>Senha: <input type="password" placeholder='password' /></p>

        </form>

      <div className='btnContainer'>

        <button>Entrar</button>
        <button>Cadastrar</button>
      
      </div>
    </div>
  )
}

export default Login
