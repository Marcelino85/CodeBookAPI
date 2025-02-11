import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv'

dotenv.config(); // Carrega as variáveis do .env

const conexao = new Pool({
    host: process.env.HOST,
    port: process.env.PG_PORT, // Ainda é 5432, conforme o .env
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    max: 10, // Número máximo de conexões no pool
    idleTimeoutMillis: 30000, // Tempo limite de inatividade (30s)
    connectionTimeoutMillis: 2000, // Tempo limite para conexão inicial (2s)

    ssl: {
        rejectUnauthorized: false, // Aceita qualquer certificado
    },
});


conexao.connect((err, client, release) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        process.exit(1); // Encerra o processo com erro
    } else {
        console.log('Conectado ao banco de dados!');
        release(); // Libera a conexão de volta ao pool
    }
});
/**
 * executa um codigo sql com ou sem valores
 * @param {string} sql instrução sql a ser executada
 * @param {string=id / [livro, id]} valores valores a serem passados no mysql
 * @param {string} mensagemReject mensagem a ser exibida
 * @returns objeto da Promise
 */


// Função para consultas
export const consulta = async (sql, valores = [], mensagemReject = 'Erro na consulta SQL') => {
    try {
        const resultado = await conexao.query(sql, valores);
        return resultado.rows; // Retorna as linhas resultantes
    } catch (err) {
        console.error('Erro na consulta:', err.message);
        throw new Error(mensagemReject);
    }
};

export default conexao;