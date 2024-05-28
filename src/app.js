
import express from 'express'

const app = express()
app.use(express.json())

function buscarId(id){
    return livros.filter(livro=>livro.id==id)
}

function atualizarPorId(id){
    return livros.findIndex(livro=>livro.id==id)
}


//Mock
const livros = [
    {id:1, titulo:'Evangelho de João', autor:'João'},
    {id:2, titulo:'Evangelho de Marcos', autor:'Marcos'},
    {id:3, titulo:'Evangelho de Lucas', autor:'Lucas'},
    {id:4, titulo:'Evangelho de Mateus', autor:'Mateus'},
]


// Rotas
app.get('/livros', (req,res)=>{
    res.status(200).send(livros)
})
app.post('/livros', (req,res)=>{
    res.status(200).send('Livro Cadatrado')
    livros.push(req.body)
     
})

app.get('/livros/:id',(req, res)=>{
    res.json(buscarId(req.params.id))
})

app.put('/livros/:id', (req, res)=>{
    let i = atualizarPorId(req.params.id)
    livros[i].titulo=req.body.titulo
    livros[i].autor=req.body.autor
    res.json('Livro atualizado com Sucesso!')
    
})

app.delete('/livros/:id', (req, res)=>{
    let i = atualizarPorId(req.params.id)
    livros.splice(i,1)
    res.status(200).send(`O Livro com o id: ${req.params.id}, foi excluido  com sucesso.`) 
})


export default app;