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

    const checkIn = url.searchParams.get("checkIn")
    const checkOut = url.searchParams.get("checkOut")
    const countBookings = parseInt(url.searchParams.get("countBookings"))

    console.log(checkIn)
    console.log(checkOut)
    console.log(countBookings)


    const sql = `
        SELECT 
            Kunden.Vorname,
            Kunden.Nachname,
            COUNT(Buchungen.BuchungID) AS AnzahlBuchungen,
            Hotels.HotelName,
            MIN(Buchungen.CheckInDatum) AS ErsterCheckIn,
            MAX(Buchungen.CheckOutDatum) AS LetzterCheckOut
        FROM 
            Buchungen
        JOIN 
            Kunden ON Buchungen.KundeID = Kunden.KundeID
        JOIN 
            Zimmer ON Buchungen.ZimmerID = Zimmer.ZimmerID
        JOIN 
            Hotels ON Zimmer.HotelID = Hotels.HotelID
        WHERE 
            Buchungen.CheckInDatum >= ? AND 
            Buchungen.CheckOutDatum <= ?
        GROUP BY 
            Kunden.KundeID, Hotels.HotelName
        HAVING 
            COUNT(Buchungen.BuchungID) >= ?
        ORDER BY 
            AnzahlBuchungen DESC;

        `;

    const customers = await db.all(sql, checkIn, checkOut, countBookings);

    return new Response(JSON.stringify(customers), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}
