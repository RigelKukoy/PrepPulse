import pkg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../../../.env");

dotenv.config({ path: envPath });

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.HOST || "localhost", // default to localhost if not set
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DBPORT || 5432, // default PostgreSQL port
});

pool.on("connect", () => {
  console.log("Connection pool established with database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export default pool;
