import axios from 'axios';
import { getAuthHeaders } from '../utils/headers';
import { BASE_URL } from './baseUrl';


interface Category {
  _id: string;
  name: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  category?: T;
  error?: string;
}

interface CategoriesResponse {
  success: boolean;
  categories?: Category[];
  count?: number;
  error?: string;
}

export const addCategory = async (name: string): Promise<ApiResponse<Category>> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/category/addCategory`,
      { name },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to add category');
    }
    throw error;
  }
};

export const getCategories = async (): Promise<CategoriesResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/category/getCategories`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to fetch categories');
    }
    throw error;
  }
};
