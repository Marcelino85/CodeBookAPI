
import app from "./app.js"
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis do .env
const PORT = process.env.APP_PORT || 3000; // Porta do servidor HTTP

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta http://localhost:${PORT}`);
});