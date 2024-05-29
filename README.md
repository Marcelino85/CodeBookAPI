# API de Dicas de Leitura de Livros de Programação

## Descrição

Esta API fornece recomendações de livros de programação, incluindo informações detalhadas como título, autor, sinopse, link para compra, link para imagem e público-alvo. 

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Nodemon

## Funcionalidades

- Listar todos os livros recomendados.
- Obter detalhes de um livro específico.
- Adicionar novos livros à lista de recomendações.
- Atualizar informações de livros existentes.
- Remover livros da lista de recomendações.

## Estrutura do Projeto

```plaintext
codeBookAPI/
├── src/
│   ├── app/
│   │   ├── controllers/
│   │   │   └── LivroController.js
│   │   ├── database/
│   │   │   └── conexao.js
│   │   ├── repositories/
│   │   │   └── LivroRepository.js
│   ├── app.js
│   ├── routes.js
│   └── server.js
├── package.json
└── vercel.json

