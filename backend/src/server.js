
import app from "./app.js"

const PORT = process.env.PORT || 3006

app.listen(PORT,()=>{
    console.log(`Servidor rodando com sucesso na porta http://localhost:${PORT}`)
})