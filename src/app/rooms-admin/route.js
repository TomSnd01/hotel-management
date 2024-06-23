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
    const checkIn = url.searchParams.get("checkIn")
    const checkOut = url.searchParams.get("checkOut")


    const sql = `
        SELECT 
            Buchungen.BuchungID,
            Hotels.HotelName,
            Zimmer.ZimmerTyp,
            GROUP_CONCAT(Ausstattung.Beschreibung, ', ') AS AusstattungBeschreibungen,
            Buchungen.CheckInDatum,
            Buchungen.CheckOutDatum
        FROM 
            Buchungen
        JOIN 
            Zimmer ON Buchungen.ZimmerID = Zimmer.ZimmerID
        JOIN 
            Hotels ON Zimmer.HotelID = Hotels.HotelID
        JOIN 
            ZimmerAusstattung ON Zimmer.ZimmerID = ZimmerAusstattung.ZimmerID
        JOIN 
            Ausstattung ON ZimmerAusstattung.AusstattungID = Ausstattung.AusstattungID
        WHERE 
            Hotels.HotelName = ? AND
            Buchungen.CheckInDatum >= ? AND 
            Buchungen.CheckOutDatum <= ? 
        GROUP BY 
            Buchungen.BuchungID, Hotels.HotelName, Zimmer.ZimmerTyp, Buchungen.CheckInDatum, Buchungen.CheckOutDatum;
        `;

    const rooms = await db.all(sql, hotelName, checkIn, checkOut);

    return new Response(JSON.stringify(rooms), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}
