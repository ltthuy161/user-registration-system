import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface RegisterUserData {
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  message: string;
  user: {
    id: number;
    email: string;
    createdAt: string;
  };
}

export const userService = {
  register: async (userData: RegisterUserData): Promise<RegisterUserResponse> => {
    const response = await api.post('/user/register', userData);
    return response.data;
  },
};

export default api;