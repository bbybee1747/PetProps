import { Router } from "express";
import adoptionFormsRouter from "./AdoptionForms";
import userFormRoutes from "./userFormRoutes";
import petsRouter from "./pets";
import authRoutes from "./auth-routes";
import contactRouter from "./Contact";

const router = Router();

console.log("Initializing index routes...");

router.use("/adoption-forms", adoptionFormsRouter); 
router.use("/users", userFormRoutes);            
router.use("/pets", petsRouter);            
router.use("/auth", authRoutes);   
router.use("/contact", contactRouter);    

router.stack.forEach((layer) => {
    if (layer.route) {
      const route = layer.route as any;
      console.log(`Route: ${Object.keys(route.methods).join(", ").toUpperCase()} ${route.path}`);
    }
  });


console.log("Index routes successfully loaded.");

export default router;
