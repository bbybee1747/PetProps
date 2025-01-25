import axios from 'axios';


const API_BASE_URL = 'http://localhost:5000/api'; 

export const fetchPets = async (
  filters: { age?: string; gender?: string; species?: string; location?: string; distance?: string },
  page: number = 1
) => {
  try {
    const params = { ...filters, page };
    console.log("Fetching pets with params:", params); 
    const response = await axios.get(`${API_BASE_URL}/pets`, { params });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching pets:", error.message);
    throw new Error("Failed to fetch pets. Please try again.");
  }
};

export const savePetToProfile = async (userId: number, petId: number): Promise<void> => {
  try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(
          `/api/user-profile/${userId}/save-pet`,
          { petId },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );
      return response.data;
  } catch (error: any) {
      console.error('Error saving pet to profile:', error);
      throw new Error(error.response?.data?.message || 'Failed to save pet.');
  }
};

export const fetchUser = async (userId: string): Promise<User> => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.get(
      `${API_BASE_URL}/user-profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user.');
  }
};

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  description: string;
  photoUrl: string;
  pets: Pet[];
}

interface Pet {
  id: number;
  name: string;
  age: string;
  species: string;
  photos: { medium: string }[];
  breeds?: { primary?: string; secondary?: string; mixed?: boolean };
}


export const fetchUserPets = async (userId: string): Promise<Pet[]> => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.get(
      `${API_BASE_URL}/user-profile/${userId}/pets`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user pets:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user pets.');
  }
};

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data; 
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;  
  }
};
