import express from 'express'
import routes from './routes.js';
import cors from 'cors';

const app = express()
//indicar para o express ler
app.use(express.json())

app.use(cors())

//user router depois do app.user(express.json())
app.use(routes)


export default app;