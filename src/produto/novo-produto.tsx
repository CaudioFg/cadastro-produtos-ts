import React, { useState } from "react";
import apiService from "../service/produtoService";

function NovoProduto() {
  const [nome, setname] = useState("");
  const [preco, setprice] = useState<string | number>(0);
  const [quantidade, setquantity] = useState<string | number>(0);

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();    
    const novoProduto = {
      nome,
      preco,
      quantidade,
    };

    try {
      await apiService.criarProduto(novoProduto);
      alert("Produto criado com sucesso");
      setname("");
      setprice("");
      setquantity("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Adicionar Produto</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    value={nome}
                    onChange={(e) => setname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="preco">Preço</label>
                  <input
                    type="number"
                    className="form-control"
                    id="preco"
                    value={preco}
                    onChange={(e) => setprice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantidade">Quantidade</label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setquantity(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-outline-success mt-3">
                  Adicionar Produto
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovoProduto;
