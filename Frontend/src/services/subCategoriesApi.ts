import axios from 'axios';
import { getAuthHeaders } from '../utils/headers';
import { BASE_URL } from './baseUrl';

interface SubCategory {
  _id: string;
  name: string;
  category: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  subCategory?: T;
  error?: string;
}

interface SubCategoriesResponse {
  success: boolean;
  subCategories?: SubCategory[];
  count?: number;
  error?: string;
}

export const addSubCategory = async (name: string, categoryId: string): Promise<ApiResponse<SubCategory>> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/sub-category/addSubCategory`,
      { name, category: categoryId },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to add subcategory');
    }
    throw error;
  }
};

export const getSubCategories = async (): Promise<SubCategoriesResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/sub-category/getSubCategories`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to fetch subcategories');
    }
    throw error;
  }
};

export const getSubCategoriesByCategory = async (categoryId: string): Promise<SubCategoriesResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/sub-category/getSubCategories/${categoryId}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to fetch subcategories');
    }
    throw error;
  }
};