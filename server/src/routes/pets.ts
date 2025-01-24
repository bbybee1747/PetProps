import { Router, Request, Response } from "express";
import axios from "axios";
import { fetchAccessToken } from "../middleware/tokenManager";
import { Pet } from "../models/pets";

const router = Router();

console.log("Pets routes initialized");

router.get("/", async (req: Request, res: Response) => {
  try {
    const { age, gender, species, location, distance, page = 1 } = req.query; 
    const limit = 9; 

    const token = await fetchAccessToken();
    if (!token) {
      throw new Error("Unable to retrieve access token");
    }
    const params: any = {
      page,
      limit,
      ...(age && { age }),
      ...(gender && { gender }),
      ...(species && { type: species }),
      ...(location && { location }),
      ...(distance && { distance }),
    };


    const { data } = await axios.get("https://api.petfinder.com/v2/animals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    const pets: Pet[] = data.animals.map((animal: any) => ({
      id: animal.id,
      name: animal.name,
      age: animal.age,
      gender: animal.gender,
      species: animal.species,
      breed: {
        primary: animal.breeds?.primary,
        secondary: animal.breeds?.secondary,
        mixed: animal.breeds?.mixed,
      },
      photos: animal.photos.map((photo: any) => ({
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