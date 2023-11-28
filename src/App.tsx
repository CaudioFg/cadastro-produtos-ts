import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import EditarProduto from "./produto/editar-produto";
import NovoProduto from "./produto/novo-produto";
import Produtos from "./produto/produtos";
import { AppContext, useAppState } from "./service/produtoService";

function App() {
  const [currentRoute, setCurrentRoute] = useState<string | null>();
  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    setCurrentRoute(path);
  }, []);

  return (
    <AppContext.Provider value={useAppState()}>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
          <span className="font-weight-bold h5">
            <i className="fas fa-home px-2"></i> Cadastro de Produtos |
          </span>

          <div  id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  onClick={() => setCurrentRoute("produtos")}
                  className={
                    currentRoute === "produtos" ? "nav-link active" : "nav-link"
                  }
                  to="/produtos"
                >
                  Produtos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={() => setCurrentRoute("NovoProduto")}
                  className={
                    currentRoute === "NovoProduto"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/NovoProduto"
                >
                  Adicionar Produto
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="" element={<Produtos />}></Route>
          <Route path="/produtos" element={<Produtos />}></Route>
          <Route path="/NovoProduto" element={<NovoProduto />}></Route>
          <Route
            path="/produtos/editarProduto/:id"
            element={<EditarProduto />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
