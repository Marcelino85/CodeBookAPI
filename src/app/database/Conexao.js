import mysql from 'mysql2'

const conexao = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })

conexao.connect()
/**
 * executa um codigo sql com ou sem valores
 * @param {string} sql instrução sql a ser executada
 * @param {string=id / [livro, id]} valores valores a serem passados no mysql
 * @param {string} mensagemReject mensagem a ser exibida
 * @returns objeto da Promise
 */

export const consulta = (sql, valores='', mensagemReject)=>{
    return new Promise((resolve, reject)=>{
        conexao.query(sql, valores, (erro, resultado)=>{
           if (erro) return reject(mensagemReject);
           const row = JSON.parse(JSON.stringify(resultado)) 
           return resolve(row)
        });
    });
};

export default conexao;