import { config } from "dotenv";
import { Pool } from "pg";
config()

const db = new Pool({
    user: process.env.PG_USER,
    password: String(process.env.PG_PASS),
    port: process.env.PG_PORT,
    host: process.env.PG_HOST,
    database: process.env.PG_DB

})

export default db;