import { Router } from 'express';
import adoptionFormsRouter from './AdoptionForms';
import userFormRoutes from './userFormRoutes';
import petsRouter from './pets';
import authRoutes from './auth-routes';

const router = Router();

console.log("Index routes initialized");


router.use('/adoption-forms', adoptionFormsRouter);
router.use('/users', userFormRoutes);
router.use('/pets', petsRouter);
router.use('/auth', authRoutes); 

console.log("Index routes loaded");
export default router;
