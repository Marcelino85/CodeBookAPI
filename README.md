# 📚 CodeBook

**CodeBook** é uma aplicação **Fullstack** desenvolvida com **React, Node.js e MySQL**, que permite aos usuários **cadastrar, organizar, ler e gerenciar livros em PDF**, com controle de visibilidade (público/privado) e autenticação de usuários.

O projeto foi criado com foco em **boas práticas de desenvolvimento**, **regras de negócio reais** e **responsividade**, funcionando corretamente em **desktop, notebook e dispositivos móveis**.

---

## 🚀 Funcionalidades

### 👤 Autenticação
- Cadastro de usuários com:
  - E-mail
  - Senha
  - Confirmação de senha
- Login seguro
- Validação de usuário existente

### 📖 Gerenciamento de Livros
- Cadastro de livros com upload de PDF
- Atualização de informações do livro
- Exclusão com confirmação
- Download do PDF
- **Leitura online do PDF**
  - Compatível com **desktop e mobile**
  - Renderização via **PDF.js**

### 👁️ Controle de Visibilidade
- 📕 **Livros privados**
  - Visíveis apenas para o usuário que cadastrou
- 📗 **Livros públicos**
  - Visíveis para todos os usuários
  - Apenas o **dono do livro** pode editar ou excluir

### 🔐 Regras de Segurança
- Controle de autoria via `userId`
- Proteção de rotas no backend
- Botões de editar/excluir visíveis apenas para o proprietário do livro

### 🌗 Experiência do Usuário
- Modo claro e modo escuro
- Interface responsiva
- Layout consistente em diferentes dispositivos

---

## 🧱 Tecnologias Utilizadas

### Frontend
- **React**
- **Axios**
- **React Router DOM**
- **PDF.js (react-pdf)**
- CSS puro

### Backend
- **Node.js**
- **Express**
- **Multer** (upload de arquivos)
- **JWT** (autenticação)

### Banco de Dados
- **MySQL**

---

## 🗄️ Modelagem do Banco de Dados

### 📌 Tabela `users`
| Campo     | Tipo    |
|---------|---------|
| id      | INT (PK) |
| username| VARCHAR |
| email   | VARCHAR |
| password| VARCHAR |

### 📌 Tabela `books`
| Campo        | Tipo |
|-------------|------|
| id          | INT (PK) |
| title       | VARCHAR |
| author      | VARCHAR |
| synopsis    | TEXT |
| link        | VARCHAR |
| imageLink   | VARCHAR |
| audience    | VARCHAR |
| arquivo     | VARCHAR |
| userId      | INT (FK) |
| visibilidade| ENUM('publico', 'privado') |

---

## 📂 Estrutura do Projeto

```text
codebook/
├── backend/
│   ├── controllers/
│   ├── repositories/
│   ├── routes/
│   ├── uploads/
│   ├── conexao.js
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Livros/
│   │   ├── ReadBook/
│   │   ├── AddBook/
│   │   ├── UpdateBook/
│   │   ├── Login/
│   │   └── Register/
│   └── App.js
│
└── README.md
```

---

## ⚙️ Como Executar o Projeto Localmente

### 🔹 Pré-requisitos
- Node.js
- MySQL
- npm ou yarn

---

## 🔹 Backend

- cd backend
- npm install
- npm run dev


### Configure o arquivo .env:

- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=sua_senha
- DB_NAME=bookdb
- JWT_SECRET=sua_chave_secreta

##🔹 Frontend
- cd frontend
- npm install
- npm start


### Configure o .env:

REACT_APP_API_URL=http://localhost:3001

#📱 Compatibilidade

✔ Desktop
✔ Notebook
✔ Tablet
✔ Smartphone (Android e iOS)

- A leitura dos PDFs é feita com PDF.js, garantindo funcionamento consistente em todos os dispositivos.

## 🧠 Decisões Técnicas Importantes

- Substituição de iframe por PDF.js para resolver problemas de compatibilidade mobile

- Separação clara entre camada de controle e repositório

- Regras de negócio implementadas tanto no frontend quanto no backend

- Estrutura pensada para escalabilidade

## 📌 Melhorias Futuras

- Integração com AWS (S3 + RDS)

- Dockerização da aplicação

- Controle de permissões por roles

- Lazy loading de PDFs

- Zoom e paginação avançada

- Transformar o projeto em PWA

## 👨‍💻 Autor

- Marcelino Albuquerque
- Desenvolvedor Fullstack com foco em Node.js, React e Cloud (AWS)

🔗 GitHub: [Marcelino Albuquerque](https://github.com/marcelino-albuquerque)  
🔗 LinkedIn: [Marcelino Albuquerque](https://www.linkedin.com/in/marcelino-albuquerque/)


## ⭐ Considerações Finais

O CodeBook é um projeto desenvolvido com foco em aprendizado prático, boas práticas e cenários reais de mercado, sendo ideal para demonstração de habilidades em entrevistas técnicas e portfólio profissional.


---

## ✅ Próximo passo (opcional)
Se quiser, eu posso:
- 🔥 Ajustar o README para **inglês**
- 🔥 Criar uma versão **mais curta (recruiter-friendly)**
- 🔥 Adaptar para **deploy em AWS**
- 🔥 Criar badges (React, Node, MySQL, AWS)

É só me dizer 👍
