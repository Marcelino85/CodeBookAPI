import express from 'express'
import routes from './routes.js';

const app = express()
//indicar para o express ler
app.use(express.json())

//user router depois do app.user(express.json())
app.use(routes)


export default app;