import { BASE_URL } from "./baseUrl";
import axios from "axios";


interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ApiData {
  name?: string;
  email?: string;
  password?: string;
  otp?: string;
  newPassword?: string;
}

// Common API function
const commonAPI = async (method: string, url: string, data?: ApiData) => {
  return await axios({
    method,
    url,
    data
  });
};

// Register new user
export const registerAPI = async (userData: RegisterData) => {
  return await commonAPI('POST', `${BASE_URL}/users/register`, userData);
};

// Login user
export const loginAPI = async (loginData: LoginData) => {
  return await commonAPI('POST', `${BASE_URL}/users/login`, loginData);
};

// Forgot password
export const forgotPasswordAPI = async (email: string) => {
  return await commonAPI('POST', `${BASE_URL}/users/forgotpassword`, { email });
};

// Reset password
export const resetPasswordAPI = async (otp: string, newPassword: string, email: string) => {
  return await commonAPI('POST', `${BASE_URL}/users/resetpassword`, { otp, newPassword, email });
};

  

