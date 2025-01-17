
import express from 'express';
import petRoutes from './Petfinder';

const app = express();
app.use('/api', petRoutes);
