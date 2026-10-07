import { Pool } from "pg";
import {drizzle} from "drizzle-orm/node-postgres";
import "dotenv/config";


const connectionString = process.env.DATABASE_URL;

if(!connectionString) throw new Error("❌ DB Connection String is Missing");

export const pool = new Pool({connectionString});
export const db = drizzle({client : pool});

export async function connectWithDB() {
    try {
        await pool.query("SELECT 1");
        // here SELECT 1 doesnt query a table cause it doesnt have any from it will just return the empty row of fresh DB.
        console.log("DB Connected Successfully ");
    } catch (error : unknown) {
        console.log(error);
        throw(error);
    }
}