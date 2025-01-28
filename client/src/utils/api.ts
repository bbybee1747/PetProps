import axios from 'axios';

const API_BASE_URL = '/api'; 


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchPets = async (
  filters: { age?: string; gender?: string; species?: string; location?: string; distance?: string },
  page: number = 1
) => {
  try {
    const params = { ...filters, page };
    console.log('Fetching pets with params:', params);
    const response = await api.get('/pets', { params });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching pets:', error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch pets. Please try again.');
  }
};

export const savePetToProfile = async (userId: number, petId: number): Promise<void> => {
  try {
    const response = await api.post(`/users/user-profile/${userId}/save-pet`, { petId });
    return response.data;
  } catch (error: any) {
    console.error('Error saving pet to profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to save pet.');
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users'); 
    return response.data;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch users.');
  }
};

export const fetchUserProfile = async (userId: number) => {
  try {
    const response = await api.get(`/users/user-profile/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user profile.');
  }
};

export const updateUserProfile = async (userId: number, data: { username: string; email: string }) => {
  try {
    const response = await api.put(`/users/user-profile/${userId}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to update user profile.');
  }
};

export const deleteUserProfile = async (userId: number) => {
  try {
    const response = await api.delete(`/users/user-profile/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting user profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete user profile.');
  }
};

export default api;
