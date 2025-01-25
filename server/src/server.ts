import express from "express";
import cors from "cors";
import routes from "./routes";
import sequelize from './sequelize';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use("/api", routes);


app.use("*", (req, res) => {
  console.log(`Route not matched: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Route not Found" });
});


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});