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
  (error) => Promise.reject(error)
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
    throw new Error(error.response?.data?.message || `Failed to fetch pets. (Status: ${error.response?.status})`);
  }
};

export const savePetToProfile = async (userId: number, petId: number): Promise<void> => {
  try {
    const response = await api.post(`/users/${userId}/save-pet`, { petId });
    return response.data;
  } catch (error: any) {
    console.error('Error saving pet to profile:', error);
    throw new Error(error.response?.data?.message || `Failed to save pet. (Status: ${error.response?.status})`);
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users'); 
    return response.data;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw new Error(error.response?.data?.message || `Failed to fetch users. (Status: ${error.response?.status})`);
  }
};

export const fetchUser = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user:', error);
    throw new Error(error.response?.data?.message || `Failed to fetch user. (Status: ${error.response?.status})`);
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await api.get("/user-profile"); 
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch user profile.");
  }
};

export const updateUserProfile = async (
  userId: number,
  data: Partial<{ name: string; email: string; phoneNumber: string; address: string; description: string; photoUrl: string }>
) => {
  try {
    const response = await api.put(`/users/${userId}/profile`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    throw new Error(error.response?.data?.message || `Failed to update user profile. (Status: ${error.response?.status})`);
  }
};

export const deleteUserProfile = async (userId: number) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting user profile:', error);
    throw new Error(error.response?.data?.message || `Failed to delete user profile. (Status: ${error.response?.status})`);
  }
};

export default api;
