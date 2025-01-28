import express from "express";
import cors from "cors";
import routes from "./routes";
import sequelize from "./sequelize";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.static('../client/dist'));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});


app.use("/api", routes);

app.use("*", (req, res) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(`Route not matched: ${req.method} ${req.originalUrl}`);
  }
  res.status(404).json({ message: "Route not Found" });
});

if (process.env.NODE_ENV !== "production") {
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      console.log(`Route: ${middleware.route.path} - Methods: ${Object.keys(middleware.route.methods).join(", ")}`);
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          console.log(`Route: ${handler.route.path} - Methods: ${Object.keys(handler.route.methods).join(", ")}`);
        }
      });
    }
  });
}

sequelize
  .sync({ alter: true, logging: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
