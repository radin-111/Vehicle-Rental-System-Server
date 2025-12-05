import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.connectionString,
});

export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        phone VARCHAR(18) NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin', 'customer'))
        )
        
        `);
};
