import { Router, Request, Response } from "express";
import axios from "axios";
import { fetchAccessToken } from "../middleware/tokenManager";

const router = Router();

console.log("Pets routes initialized");

interface PetfinderAnimal {
  id: number;
  name: string;
  age: string;
  gender: string;
  species: string;
  breeds: {
    primary: string;
    secondary?: string;
    mixed: boolean;
  };
  photos: {
    small: string;
    medium: string;
    large: string;
    full: string;
  }[];
  description: string;
  contact: {
    email?: string;
    phone?: string;
    address?: {
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      postcode?: string;
    };
  };
  status: string;
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const { age, gender, species, location } = req.query;
    const page = parseInt(req.query.page as string, 10) || 1;
    const distance = req.query.distance ? parseInt(req.query.distance as string, 10) : undefined;
    const limit = 9;

    const token = await fetchAccessToken();
    if (!token) {
      throw new Error("Unable to retrieve access token");
    }

    const params: Record<string, any> = {
      page,
      limit,
      ...(age && { age }),
      ...(gender && { gender }),
      ...(species && { type: species }),
      ...(location && { location }),
      ...(distance && { distance }),
    };

    const { data } = await axios.get("https://api.petfinder.com/v2/animals", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });

    const pets = data.animals.map((animal: PetfinderAnimal) => ({
      id: animal.id,
      name: animal.name,
      age: animal.age,
      gender: animal.gender,
      species: animal.species,
      breed: {
        primary: animal.breeds.primary,
        secondary: animal.breeds.secondary || null,
        mixed: animal.breeds.mixed,
      },
      photos: animal.photos.map((photo) => ({
        small: photo.small,
        medium: photo.medium,
        large: photo.large,
        full: photo.full,
      })),
      description: animal.description || "",
      contact: {
        email: animal.contact?.email || null,
        phone: animal.contact?.phone || null,
        address: {
          address1: animal.contact?.address?.address1 || null,
          address2: animal.contact?.address?.address2 || null,
          city: animal.contact?.address?.city || null,
          state: animal.contact?.address?.state || null,
          postcode: animal.contact?.address?.postcode || null,
        },
      },
      status: animal.status,
    }));

    res.status(200).json(pets);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching pets:", error.response?.data || error.message);
      res.status(500).json({ message: "Error fetching pets from Petfinder API." });
    } else {
      console.error("Error fetching pets:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

export default router;
