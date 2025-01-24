import express, { Request, Response } from 'express';

const app = express();
import nodeGeocoder from 'node-geocoder';

const Geocodio = require('geocodio-library-node');
const geocoder = new Geocodio(process.env.GEO_API_KEY);

app.post('/api/geocode', async (req: Request, res: Response) => {
    const { address } = req.body;
    try {
      const response = await geocoder.geocode(address);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });