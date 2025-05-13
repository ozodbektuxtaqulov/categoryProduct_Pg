import { log } from "node:console";
import db from "./index.js";
import { readFileSync } from "node:fs";
import path from "node:path";

function initDB() {
    try{
        const file = path.join('src/db/init.sql')
        const sql = readFileSync(file, 'utf-8')
        db.query(sql);
        console.log("tables Create  successfully");
    
    }catch(error){
        console.log(error);  
    }
}

export default initDB;

