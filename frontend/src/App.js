import {BrowserRouter, Routes, Route} from "react-router-dom"
import Books from "./pages/Livros/Books";
import Add from "./pages/AdcionarLivros/Add";
import Update from "./pages/AtualizarLivros/Update";
import './App.css'
import Login from "./pages/Login/Loginn";




function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/livros" element={<Books/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
