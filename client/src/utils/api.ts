import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; 

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

  const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Change this to your backend URL
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Fetch users from the backend
  export const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      return response.data;  // Return the data from the response
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;  // Rethrow the error to handle it in the calling component
    }
  };