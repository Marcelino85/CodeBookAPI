import mysql from 'mysql2'

const conexao = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'pedro1904',
    database:'bookdb'
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