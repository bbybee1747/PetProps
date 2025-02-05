import { Router } from "express";
import adoptionFormsRouter from "./AdoptionForms";
import userFormRoutes from "./userFormRoutes";
import petsRouter from "./pets";
import authRoutes from "./auth-routes";
import contactRouter from "./Contact";

const router = Router();

console.log("Initializing index routes...");

const safeUse = (path: string, route: any) => {
  try {
    router.use(path, route);
  } catch (error) {
    console.error(`Failed to load route ${path}:`, error);
  }
};

safeUse("/adoption-forms", adoptionFormsRouter);
safeUse("/users", userFormRoutes);
safeUse("/pets", petsRouter);
safeUse("/auth", authRoutes);
safeUse("/contact", contactRouter);

router.stack
  .filter((layer) => layer.route)
  .forEach((layer) => {
    const route = layer.route as any;
    console.log(`Route: ${Object.keys(route.methods).join(", ").toUpperCase()} ${route.path}`);
  });

console.log("Index routes successfully loaded.");

export default router;
