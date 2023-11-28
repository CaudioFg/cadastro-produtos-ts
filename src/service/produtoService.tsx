import axios from "axios";
import { createContext, useState } from "react";

const API_BASE_URL = "http://localhost:3001";
export const AppContext = createContext("Default");

const apiService = {
  getProdutos: async (keyword = "", page = 1, size = 5) => {
    try {
        debugger;
      const response = await axios.get(
        `${API_BASE_URL}/produtos?nome_like=${keyword}&_page=${page}&_limit=${size}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getProduto: async (id: string | undefined) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/produtos/${id}`);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  criarProduto: async (productData: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/produtos`,
        productData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  atualizarProduto: async (idProduto: string | undefined, productData: any) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/produtos/${idProduto}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  excluirProduto: async (idProduto: number) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/produtos/${idProduto}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default apiService;

export const useAppState: any = () => {
  const initialState = {
    produtos: [],
    currentPage: 1,
    pageSize: 5,
    keyword: "",
    totalPages: 0,
  };
  const appState = useState(initialState);
  return appState;
};
