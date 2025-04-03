import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import RouteNotFound from "./middleware/RouteNotFound.js";
import pool from "./config/db.js";
import schedulesRoutes from "./routes/schedulesRoutes.js";

dotenv.config();

//get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();

//logger
app.use(logger);

//setup static folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//postgres db test
app.get("/", async (req, res) => {
  console.log("start");
  const result = await pool.query("SELECT current_database()");
  console.log("end");
  res.send(`The database name is: ${result.rows[0].current_database}`);
});

//Router
app.use("/api", schedulesRoutes);
//Error handler
app.use(RouteNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is runing on port ${PORT}`);
});
