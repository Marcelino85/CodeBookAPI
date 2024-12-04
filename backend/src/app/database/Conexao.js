import mysql from 'mysql2'

const conexao = mysql.createConnection({
    host:'sql10.freesqldatabase.com',
    port:'3306',
    user:'sql10749479',
    password:'zhYPPHSpae',
    database:'sql10749479'
}) 

conexao.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
  })
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