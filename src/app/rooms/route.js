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

    let hotelName = url.searchParams.get("hotelName")
    if (hotelName == "Los Angeles") {hotelName = "Los_Angeles"}
    const selectedAusstattungenString = url.searchParams.get('selectedAusstattungen');
    const selectedAusstattungen = selectedAusstattungenString ? selectedAusstattungenString.split(',') : [];

    const placeholders = selectedAusstattungen.map(() => '?').join(', ');
    const numSelected = selectedAusstattungen.length;

    const checkIn = url.searchParams.get("checkIn");
    const checkOut = url.searchParams.get("checkOut");
    const firstName = url.searchParams.get("firstName");
    const lastName = url.searchParams.get("lastName");
    const email = url.searchParams.get("email");
    const phone = url.searchParams.get("phone");
    const roomType = url.searchParams.get("roomType");
    let selectedRoom = 1;
    let preis = 100;

    const roomFilter = `
    SELECT 
        z.ZimmerID,
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
    AND
        z.ZimmerTyp = ?
    GROUP BY 
        z.ZimmerID 
    HAVING 
        COUNT(DISTINCT a.Beschreibung) = ?
    `;

    const rooms = await db.all(roomFilter, hotelName, ...selectedAusstattungen, roomType, numSelected);
    if (Object.keys(rooms).length > 0) {
        selectedRoom = rooms[0].ZimmerID;
        preis = rooms[0].Preis;
    }

    const kundenSql = `
    INSERT INTO Kunden (Vorname, Nachname, Email, Telefonnummer)
    VALUES (?, ?, ?, ?)
    `;

    await db.run(kundenSql, firstName, lastName, email, phone);

    const result = await db.get("SELECT last_insert_rowid() as KundeID");
    const kundeID = result.KundeID;

    const buchungenSql = `
    INSERT INTO Buchungen (KundeID, ZimmerID, CheckInDatum, CheckOutDatum, Gesamtpreis)
        VALUES (?, ?, ?, ?, ?)
    `

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const diffMs = endDate - startDate;
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const gesamtPreis = diffDays * preis;

    await db.run(buchungenSql, kundeID, selectedRoom, checkIn, checkOut, gesamtPreis)

    return new Response(JSON.stringify(rooms), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}
