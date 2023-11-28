import React, { useContext, useEffect, useState } from "react";

import {
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate,Link } from "react-router-dom";
import apiService, { AppContext } from "../service/produtoService";

function Produtos() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [prodState, setProdState]: any = useContext(AppContext);
  const [currentRoute, setCurrentRoute] = useState<string | null>();
  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    setCurrentRoute(path);
  }, []);

  useEffect(() => {
    fetchProdutos(prodState.keyword, prodState.currentPage, prodState.pageSize);
  }, []);

  const fetchProdutos = async (keyword: string, currentPage: number, sizePage: number) => {
    try {
      const response: any = await apiService.getProdutos(
        keyword,
        currentPage,
        sizePage
      );
      const totalElementCount = response.headers["x-total-count"];
      let totalPages = Math.floor(totalElementCount / sizePage);
      if (totalElementCount % sizePage !== 0) ++totalPages;
      setProdState({
        ...prodState,
        produtos: response.data,
        currentPage: currentPage,
        keyword: keyword, 
        sizePage: sizePage,
        totalPages: totalPages,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (idProduto: number) => {
    try {
      await apiService.excluirProduto(idProduto);
      fetchProdutos(
        prodState.keyword,
        prodState.currentPage,
        prodState.sizePage
      );
    } catch (error) {
      console.error(error);
    }
  };  

  const handleGoToPage = (page: number) => {
    fetchProdutos(prodState.keyword, page, prodState.pageSize);
  };

  const handlSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchProdutos(query, 1, prodState.pageSize);
  };
  return (
    <div className="container-fluid mt-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title position-relative">
            Produtos{" "}
          </h5>
          <div style={{ display: "flex" }}>
            <button type="submit" className="btn btn-outline-success mt-3" style={{ margin: 'auto' }} >
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
            </button>
          </div>

          <div className="row g-2 mt-2" style={{ margin: 'auto', justifyContent: 'center' }}>
            <div className="col-auto">
              <form onSubmit={handlSearch}>
                <div className="input-group" style={{ marginBottom: '50px' }}>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="search"
                    className="form-control rounded"
                    placeholder="Pesquisar..."
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <button type="submit" className="btn  btn-primary">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <table className="table align-middle mb-0 bg-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {prodState.produtos.map((produto: any) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{produto.nome}</td>
                  <td>R${produto.preco}</td>
                  <td>{produto.quantidade}</td>
                  <td className="d-flex align-items-center">
                    <button
                      className="btn btn-link btn-sm ml-3"
                      onClick={() => navigate(`editarProduto/${produto.id}`)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="btn  btn-link btn-sm "
                      onClick={() => handleDelete(produto.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="...">
            <ul className="pagination justify-content-center mt-3 mb-1">
              <li className="page-item ">
                <button
                  onClick={() => handleGoToPage(prodState.currentPage - 1)}
                  className={
                    prodState.currentPage !== 1
                      ? "page-link"
                      : "page-link disabled"
                  }
                >
                  Anterior
                </button>
              </li>

              {new Array(prodState.totalPages).fill(0).map((v, index) => (
                <li key={index + 1} className="page-item ">
                  <button
                    onClick={() => handleGoToPage(index + 1)}
                    className={
                      prodState.currentPage === index + 1
                        ? "page-link active"
                        : "page-link "
                    }
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className="page-item">
                <button
                  onClick={() => handleGoToPage(prodState.currentPage + 1)}
                  className={
                    prodState.totalPages !== prodState.currentPage
                      ? "page-link"
                      : "page-link disabled"
                  }
                >
                  Próximo
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Produtos;
