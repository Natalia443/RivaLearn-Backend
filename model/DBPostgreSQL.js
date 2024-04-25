import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: true,
});

pool.on("error", (err) => {
  console.error("Error en el pool de conexiones:", err.message);
});

export default pool;
