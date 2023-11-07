import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dataBaseConnection } from "./config/database.js";
import { indexRoutes } from "./routes/index.js";
import customErrorHandler from "./middleware/customErrorHandler.js";
import path from "path";

//Router Path
const router = express.Router();

//Configuring the environmental variable
dotenv.config();

//Server Setup
const app = express();
const PORT = process.env.PORT || 5005;

//Middlewares
app.use(express.json());
app.use(cors());
app.use(customErrorHandler);

// Determine the root directory based on the current module's directory
const __dirname = path.resolve();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

//Database Connection
dataBaseConnection();

//Test Routes
router.get("/", async (req, res) => {
  return res
    .status(200)
    .json({ message: "API of Aspire Kaleidoscope... A Simple Blogger App" });
});

//Routes
app.use("/api", indexRoutes);

//Listening the Server
app.listen(PORT, () => {
  console.log(`Server Started in localhost:${PORT}`);
});
