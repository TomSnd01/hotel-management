import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

// Define the GET request handler function
export async function GET(req, res) {
    // Check if the database instance has been initialized
    if (!db) {
        // If the database instance is not initialized, open the database connection
        db = await open({
            filename: "./database.db", // Specify the database file path
            driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
        });
    }


    const hotels = await db.all("SELECT * FROM hotels");
    return new Response(JSON.stringify(hotels), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}
