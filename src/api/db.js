const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
    "./database.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the SQlite database.");
    }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
    // Create the items table if it doesn't exist
    db.run(
        `CREATE TABLE IF NOT EXISTS Hotels (
            HotelID INTEGER NOT NULL PRIMARY KEY,
            HotelName VARCHAR(100) NOT NULL
        )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Created Hotels table.");

            db.run(`
            INSERT INTO Hotels (HotelName) VALUES 
                ('Los_Angeles'), 
                ('Singapur'), 
                ('Berlin')
            `, (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Inserted data into Hotels table.");
            });
        }
    );
    db.run(`
    CREATE TABLE IF NOT EXISTS Kunden (
        KundeID INTEGER NOT NULL PRIMARY KEY,
        Vorname VARCHAR(50) NOT NULL,
        Nachname VARCHAR(50) NOT NULL,
        Email VARCHAR(100),
        Telefonnummer VARCHAR(20)
    )`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Created customers table.");
        db.run(`
            INSERT INTO Kunden (Vorname, Nachname, Email, Telefonnummer) VALUES 
                ('Max', 'Mustermann', 'max@example.com', '1234567890'),
                ('Anna', 'Schmidt', 'anna@example.com', '0987654321'),
                ('John', 'Doe', 'john@example.com', '1122334455'),
                ('Maria', 'Musterfrau', 'maria@example.com', '3344556677'),
                ('Paul', 'Peters', 'paul@example.com', '5566778899'),
                ('Eva', 'Meier', 'eva@example.com', '6677889900'),
                ('Lisa', 'Langer', 'lisa@example.com', '7788990011'),
                ('Tom', 'Schneider', 'tom@example.com', '8899001122'),
                ('Emma', 'Wolf', 'emma@example.com', '9900112233'),
                ('Noah', 'Weber', 'noah@example.com', '0112233445')
            `, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Inserted data into Kunden table.");
        });
    });

    db.run(`
            CREATE TABLE IF NOT EXISTS Ausstattung (
                AusstattungID INTEGER NOT NULL PRIMARY KEY,
                Beschreibung VARCHAR(100) NOT NULL
            )`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Created room extras table.");
        db.run(`
            INSERT INTO Ausstattung (Beschreibung) VALUES 
                ('Badewanne'), 
                ('Meerblick'), 
                ('Balkon'), 
                ('Wi-Fi');
            `, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Inserted data into Zimmer table.");
        });
    });

    db.run(`
            CREATE TABLE IF NOT EXISTS Zimmer (
                ZimmerID INTEGER NOT NULL PRIMARY KEY,
                HotelID INT,
                Zimmernummer VARCHAR(10) NOT NULL,
                ZimmerTyp VARCHAR(50),
                Preis DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (HotelID) REFERENCES Hotels(HotelID)
            )`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Created rooms table.");
        db.run(`
                INSERT INTO Zimmer (ZimmerID, HotelID, Zimmernummer, ZimmerTyp, Preis) VALUES
                (1, 1, 150, 'Einzelzimmer', 75.00),
                (2, 2, 200, 'Doppelzimmer', 100.00),
                (3, 3, 250, 'Einzelzimmer', 80.00),
                (4, 1, 180, 'Doppelzimmer', 110.00),
                (5, 2, 220, 'Suite', 700.00),
                (6, 3, 260, 'Doppelzimmer', 120.00),
                (7, 1, 170, 'Einzelzimmer', 90.00),
                (8, 2, 210, 'Doppelzimmer', 130.00),
                (9, 3, 240, 'Einzelzimmer', 60.00),
                (10, 1, 190, 'Doppelzimmer', 115.00),
                (11, 2, 230, 'Einzelzimmer', 85.00),
                (12, 3, 270, 'Doppelzimmer', 125.00),
                (13, 1, 160, 'Einzelzimmer', 95.00),
                (14, 2, 205, 'Doppelzimmer', 140.00),
                (15, 3, 255, 'Einzelzimmer', 75.00),
                (16, 1, 175, 'Doppelzimmer', 135.00),
                (17, 2, 215, 'Suite', 650.00),
                (18, 3, 265, 'Doppelzimmer', 105.00),
                (19, 1, 155, 'Einzelzimmer', 85.00),
                (20, 2, 225, 'Suite', 1150.00),
                (21, 3, 245, 'Einzelzimmer', 95.00),
                (22, 1, 185, 'Doppelzimmer', 125.00),
                (23, 2, 235, 'Einzelzimmer', 70.00),
                (24, 3, 275, 'Doppelzimmer', 140.00),
                (25, 1, 165, 'Einzelzimmer', 105.00),
                (26, 2, 195, 'Doppelzimmer', 130.00),
                (27, 3, 280, 'Einzelzimmer', 90.00),
                (28, 1, 145, 'Doppelzimmer', 120.00),
                (29, 2, 240, 'Einzelzimmer', 110.00),
                (30, 3, 290, 'Doppelzimmer', 150.00),
                (31, 1, 175, 'Einzelzimmer', 75.00),
                (32, 2, 205, 'Doppelzimmer', 100.00),
                (33, 3, 255, 'Einzelzimmer', 80.00),
                (34, 1, 180, 'Suite', 1100.00),
                (35, 2, 220, 'Einzelzimmer', 70.00),
                (36, 3, 260, 'Doppelzimmer', 120.00),
                (37, 1, 170, 'Einzelzimmer', 90.00),
                (38, 2, 210, 'Doppelzimmer', 130.00),
                (39, 3, 240, 'Einzelzimmer', 60.00),
                (40, 1, 190, 'Doppelzimmer', 115.00),
                (41, 2, 230, 'Einzelzimmer', 85.00),
                (42, 3, 270, 'Doppelzimmer', 125.00),
                (43, 1, 160, 'Einzelzimmer', 95.00),
                (44, 2, 205, 'Doppelzimmer', 140.00),
                (45, 3, 255, 'Einzelzimmer', 75.00),
                (46, 1, 175, 'Doppelzimmer', 135.00),
                (47, 2, 215, 'Einzelzimmer', 65.00),
                (48, 3, 265, 'Suite', 1050.00),
                (49, 1, 155, 'Einzelzimmer', 85.00),
                (50, 2, 225, 'Doppelzimmer', 115.00),
                (51, 3, 245, 'Einzelzimmer', 95.00),
                (52, 1, 185, 'Doppelzimmer', 125.00),
                (53, 2, 235, 'Einzelzimmer', 70.00),
                (54, 3, 275, 'Doppelzimmer', 140.00),
                (55, 1, 165, 'Einzelzimmer', 105.00),
                (56, 2, 195, 'Doppelzimmer', 130.00),
                (57, 3, 280, 'Einzelzimmer', 90.00),
                (58, 1, 145, 'Doppelzimmer', 120.00),
                (59, 2, 240, 'Einzelzimmer', 110.00),
                (60, 3, 290, 'Doppelzimmer', 150.00),
                (61, 1, 175, 'Einzelzimmer', 75.00),
                (62, 2, 205, 'Doppelzimmer', 100.00),
                (63, 3, 255, 'Einzelzimmer', 80.00),
                (64, 1, 180, 'Doppelzimmer', 110.00),
                (65, 2, 220, 'Suite', 700.00),
                (66, 3, 260, 'Doppelzimmer', 120.00),
                (67, 1, 170, 'Einzelzimmer', 90.00),
                (68, 2, 210, 'Doppelzimmer', 130.00),
                (69, 3, 240, 'Einzelzimmer', 60.00),
                (70, 1, 190, 'Doppelzimmer', 115.00),
                (71, 2, 230, 'Einzelzimmer', 85.00),
                (72, 3, 270, 'Doppelzimmer', 125.00),
                (73, 1, 160, 'Einzelzimmer', 95.00),
                (74, 2, 205, 'Doppelzimmer', 140.00),
                (75, 3, 255, 'Einzelzimmer', 75.00),
                (76, 1, 175, 'Doppelzimmer', 135.00),
                (77, 2, 215, 'Einzelzimmer', 65.00),
                (78, 3, 265, 'Doppelzimmer', 105.00),
                (79, 1, 155, 'Suite', 850.00),
                (80, 2, 225, 'Doppelzimmer', 115.00),
                (81, 3, 245, 'Einzelzimmer', 95.00),
                (82, 1, 185, 'Doppelzimmer', 125.00),
                (83, 2, 235, 'Einzelzimmer', 70.00),
                (84, 3, 275, 'Doppelzimmer', 140.00),
                (85, 1, 165, 'Einzelzimmer', 105.00),
                (86, 2, 195, 'Doppelzimmer', 130.00),
                (87, 3, 280, 'Einzelzimmer', 90.00),
                (88, 1, 145, 'Doppelzimmer', 120.00),
                (89, 2, 240, 'Einzelzimmer', 110.00),
                (90, 3, 290, 'Doppelzimmer', 150.00),
                (91, 1, 175, 'Einzelzimmer', 75.00),
                (92, 2, 205, 'Doppelzimmer', 100.00),
                (93, 3, 255, 'Einzelzimmer', 80.00),
                (94, 1, 180, 'Doppelzimmer', 110.00),
                (95, 2, 220, 'Suite', 700.00),
                (96, 3, 260, 'Doppelzimmer', 120.00),
                (97, 1, 170, 'Einzelzimmer', 90.00),
                (98, 2, 210, 'Doppelzimmer', 130.00),
                (99, 3, 240, 'Einzelzimmer', 60.00),
                (100, 1, 190, 'Doppelzimmer', 115.00);

            `, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Inserted data into Zimmer table.");
        });
    });

    db.run(`
            CREATE TABLE IF NOT EXISTS Buchungen (
                BuchungID INTEGER NOT NULL PRIMARY KEY,
                KundeID INT,
                ZimmerID INT,
                CheckInDatum DATE NOT NULL,
                CheckOutDatum DATE NOT NULL,
                Gesamtpreis DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (KundeID) REFERENCES Kunden(KundeID),
                FOREIGN KEY (ZimmerID) REFERENCES Zimmer(ZimmerID)
            )`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Created Buchungen table.");
        db.run(`
            INSERT INTO Buchungen (KundeID, ZimmerID, CheckInDatum, CheckOutDatum, Gesamtpreis) VALUES 
                -- Hotel Los Angeles Buchungen
                (1, 1, '2024-01-01', '2024-01-10', 900.00),
                (1, 2, '2024-01-11', '2024-01-20', 900.00),
                (1, 3, '2024-01-21', '2024-01-30', 900.00),
                (1, 4, '2024-02-01', '2024-02-10', 900.00),
                (1, 5, '2024-02-11', '2024-02-20', 900.00),
                (2, 6, '2024-02-21', '2024-03-01', 900.00),
                (2, 7, '2024-03-01', '2024-03-10', 900.00),
                (2, 8, '2024-03-11', '2024-03-20', 900.00),
                (3, 9, '2024-03-21', '2024-03-30', 900.00),
                (3, 10, '2024-04-01', '2024-04-10', 900.00),

                -- Hotel Singapur Buchungen
                (4, 25, '2024-01-01', '2024-01-10', 1200.00),
                (4, 26, '2024-01-11', '2024-01-20', 1200.00),
                (5, 27, '2024-01-21', '2024-01-30', 1200.00),
                (6, 28, '2024-02-01', '2024-02-10', 1200.00),
                (6, 29, '2024-02-11', '2024-02-20', 1200.00),
                (6, 30, '2024-02-21', '2024-03-01', 1200.00),
                (6, 31, '2024-03-01', '2024-03-10', 1200.00),
                (6, 32, '2024-03-11', '2024-03-20', 1200.00),
                (7, 33, '2024-03-21', '2024-03-30', 1200.00),
                (7, 34, '2024-04-01', '2024-04-10', 1200.00),

                -- Hotel Berlin Buchungen
                (8, 49, '2024-01-01', '2024-01-10', 1100.00),
                (8, 50, '2024-01-11', '2024-01-20', 1100.00),
                (8, 51, '2024-01-21', '2024-01-30', 1100.00),
                (8, 52, '2024-02-01', '2024-02-10', 1100.00),
                (8, 53, '2024-02-11', '2024-02-20', 1100.00),
                (9, 54, '2024-02-21', '2024-03-01', 1100.00),
                (9, 55, '2024-03-01', '2024-03-10', 1100.00),
                (9, 56, '2024-03-11', '2024-03-20', 1100.00),
                (9, 57, '2024-03-21', '2024-03-30', 1100.00),
                (10, 58, '2024-04-01', '2024-04-10', 1100.00);
            `, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Inserted data into Buchungen table.");
        });
    });

    db.run(`
            CREATE TABLE IF NOT EXISTS ZimmerAusstattung (
                ZimmerID INT,
                AusstattungID INT,
                FOREIGN KEY (ZimmerID) REFERENCES Zimmer(ZimmerID),
                FOREIGN KEY (AusstattungID) REFERENCES Ausstattung(AusstattungID)
            )`, (err) => {
        if (err) {
            return console.error(err.message + " at ZimmerAusstattung");
        }
        console.log("Created ZimmerAusstattung table.");
        db.run(`
                INSERT INTO ZimmerAusstattung (ZimmerID, AusstattungID) VALUES
                (1, 1), (1, 2), (1, 3), (1, 4),
                (2, 1), (2, 2),
                (3, 2), (3, 3), (3, 4),
                (4, 1), (4, 3), (4, 4),
                (5, 1), (5, 4),
                (6, 2), (6, 3),
                (7, 3), (7, 4),
                (8, 1), (8, 2), (8, 3),
                (9, 1), (9, 3), (9, 4),
                (10, 2), (10, 4),
                (11, 1), (11, 2),
                (12, 1), (12, 3), (12, 4),
                (13, 2), (13, 3),
                (14, 1), (14, 4),
                (15, 1), (15, 2), (15, 3),
                (16, 2), (16, 4),
                (17, 1), (17, 3), (17, 4),
                (18, 1), (18, 2),
                (19, 2), (19, 3), (19, 4),
                (20, 1), (20, 3),
                (21, 1), (21, 2), (21, 3), (21, 4),
                (22, 1), (22, 2),
                (23, 2), (23, 3), (23, 4),
                (24, 1), (24, 3), (24, 4),
                (25, 1), (25, 4),
                (26, 2), (26, 3),
                (27, 3), (27, 4),
                (28, 1), (28, 2), (28, 3),
                (29, 1), (29, 3), (29, 4),
                (30, 2), (30, 4),
                (31, 1), (31, 2),
                (32, 1), (32, 3), (32, 4),
                (33, 2), (33, 3),
                (34, 1), (34, 4),
                (35, 1), (35, 2), (35, 3),
                (36, 2), (36, 4),
                (37, 1), (37, 3), (37, 4),
                (38, 1), (38, 2),
                (39, 2), (39, 3), (39, 4),
                (40, 1), (40, 3),
                (41, 1), (41, 2), (41, 3), (41, 4),
                (42, 1), (42, 2),
                (43, 2), (43, 3), (43, 4),
                (44, 1), (44, 3), (44, 4),
                (45, 1), (45, 4),
                (46, 2), (46, 3),
                (47, 3), (47, 4),
                (48, 1), (48, 2), (48, 3),
                (49, 1), (49, 3), (49, 4),
                (50, 2), (50, 4),
                (51, 1), (51, 2),
                (52, 1), (52, 3), (52, 4),
                (53, 2), (53, 3),
                (54, 1), (54, 4),
                (55, 1), (55, 2), (55, 3),
                (56, 2), (56, 4),
                (57, 1), (57, 3), (57, 4),
                (58, 1), (58, 2),
                (59, 2), (59, 3), (59, 4),
                (60, 1), (60, 3),
                (61, 1), (61, 2), (61, 3), (61, 4),
                (62, 1), (62, 2),
                (63, 2), (63, 3), (63, 4),
                (64, 1), (64, 3), (64, 4),
                (65, 1), (65, 4),
                (66, 2), (66, 3),
                (67, 3), (67, 4),
                (68, 1), (68, 2), (68, 3),
                (69, 1), (69, 3), (69, 4),
                (70, 2), (70, 4),
                (71, 1), (71, 2),
                (72, 1), (72, 3), (72, 4);
                (73, 1), (73, 2), (73, 3), (73, 4),
                (74, 1), (74, 2),
                (75, 2), (75, 3), (75, 4),
                (76, 1), (76, 3), (76, 4),
                (77, 1), (77, 4),
                (78, 2), (78, 3),
                (79, 3), (79, 4),
                (80, 1), (80, 2), (80, 3),
                (81, 1), (81, 3), (81, 4),
                (82, 2), (82, 4),
                (83, 1), (83, 2), (83, 3), (83, 4),
                (84, 1), (84, 2),
                (85, 2), (85, 3), (85, 4),
                (86, 1), (86, 3), (86, 4),
                (87, 1), (87, 4),
                (88, 2), (88, 3),
                (89, 3), (89, 4),
                (90, 1), (90, 2), (90, 3),
                (91, 1), (91, 3), (91, 4),
                (92, 2), (92, 4),
                (93, 1), (93, 2), (93, 3), (93, 4),
                (94, 1), (94, 2),
                (95, 2), (95, 3), (95, 4),
                (96, 1), (96, 3), (96, 4),
                (97, 1), (97, 4),
                (98, 2), (98, 3),
                (99, 3), (99, 4),
                (100, 1), (100, 2), (100, 3);
            `, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Inserted data into ZimmerAusstattung table.");
        });
    });
});
