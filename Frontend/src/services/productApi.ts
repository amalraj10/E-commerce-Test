import axios from "axios";
import { BASE_URL } from "./baseUrl";

// Add Product API
export const addProductAPI = async (formData: FormData) => {
  const token = localStorage.getItem('token');
  
  return await axios({
    method: 'POST',
    url: `${BASE_URL}/product/addProduct`,
    data: formData,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    }
  });
};

// Get All Products API
export const getProductsAPI = async () => {
  const token = localStorage.getItem('token');
  
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/product/getProducts`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Get Single Product API
export const getProductAPI = async (id: string) => {
  const token = localStorage.getItem('token');
  
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/product/getProduct/${id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Edit Product API
export const editProductAPI = async (id: string, formData: FormData) => {
  const token = localStorage.getItem('token');
  
  return await axios({
    method: 'PUT',
    url: `${BASE_URL}/product/editProduct/${id}`,
    data: formData,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    }
  });
};

// Search Products API
export const searchProductsAPI = async (query: string) => {
  const token = localStorage.getItem('token');
  
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/product/searchProducts?query=${encodeURIComponent(query)}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
