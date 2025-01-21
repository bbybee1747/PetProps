import axios from "axios";

let tokenCache: { token: string; expiry: number } | null = null;

export const fetchAccessToken = async (): Promise<string | undefined> => {
  if (tokenCache && Date.now() < tokenCache.expiry) {
    return tokenCache.token;
  }

  try {
    const response = await axios.post("https://api.petfinder.com/v2/oauth2/token", {
      grant_type: "client_credentials",
      client_id: process.env.PET_FINDER_CLIENT_ID,
      client_secret: process.env.PET_FINDER_CLIENT_SECRET,
    });

    const { access_token, expires_in } = response.data;

    tokenCache = {
      token: access_token,
      expiry: Date.now() + expires_in * 1000 - 60000, 
    };

    return access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching access token:", error.response?.data || error.message);
    } else {
      console.error("Error fetching access token:", error);
    }
    throw new Error("Failed to fetch access token. Please try again later.");
  }
};
