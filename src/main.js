import express from "express";
import  initDB  from './db/initDB.js'
import categoriesRouter from './routes/categories.routes.js'
import { config } from "dotenv";
config();


const app = express();
initDB();

const PORT = process.env.PORT;

app.use(express.json());

app.use('/category', categoriesRouter)

app.listen(PORT, () => console.log("Server running on port", PORT));
