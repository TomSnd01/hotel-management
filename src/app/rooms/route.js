import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

export async function GET(req, res) {
    if (!db) {
        db = await open({
            filename: "./database.db", 
            driver: sqlite3.Database, 
        });
    }

    const url = new URL(req.url)

    const hotelName = url.searchParams.get("hotelName")
    const selectedAusstattungenString = url.searchParams.get('selectedAusstattungen');
    console.log(selectedAusstattungenString)
    const selectedAusstattungen = selectedAusstattungenString ? selectedAusstattungenString.split(',') : [];

    const placeholders = selectedAusstattungen.map(() => '?').join(', ');
    const numSelected = selectedAusstattungen.length;

    console.log(hotelName);

    const sql = `
    SELECT 
        z.ZimmerID, 
        z.HotelID, 
        z.Zimmernummer, 
        z.ZimmerTyp, 
        z.Preis
    FROM 
        Zimmer z
    JOIN 
        ZimmerAusstattung za 
    ON 
        z.ZimmerID = za.ZimmerID
    JOIN 
        Ausstattung a 
    ON 
        za.AusstattungID = a.AusstattungID
    JOIN 
        Hotels h 
    ON 
        z.HotelID = h.HotelID
    WHERE 
        h.HotelName = ?
    AND 
        a.Beschreibung IN (${placeholders}) 
    GROUP BY 
        z.ZimmerID, z.HotelID, z.Zimmernummer, z.ZimmerTyp, z.Preis
    HAVING 
        COUNT(DISTINCT a.Beschreibung) = ?
    `;

    const rooms = await db.all(sql, hotelName, ...selectedAusstattungen, numSelected);

    return new Response(JSON.stringify(rooms), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}
