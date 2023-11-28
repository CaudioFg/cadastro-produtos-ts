import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../service/produtoService";

function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nome, setname] = useState("");
  const [preco, setprice] = useState<string | number>(0);
  const [quantidade, setquantity] = useState<string | number>(0);

  useEffect(() => {
    fetchDetalhesProduto();
  }, [id]);

  async function fetchDetalhesProduto() {
    try {
      const response = await apiService.getProduto(id);
      const dadosProduto = response.data;
      setname(dadosProduto.nome);
      setprice(dadosProduto.preco);
      setquantity(dadosProduto.quantidade);
    } catch (error: any) {
      navigate("/produtos");
      toast.error("Erro ao carregar detalhes do produto: " + error.message);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const produtoAtualizado = {
      nome,
      preco,
      quantidade,
    };

    try {
      await apiService.atualizarProduto(id, produtoAtualizado);
      alert("Produto atualizado com sucesso");
      navigate("/produtos");
    } catch (error) {
      console.error( error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Editar Produto</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nome do Produto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={nome}
                    onChange={(e) => setname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="preco">Preço do Produto</label>
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
                  Gravar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarProduto;
