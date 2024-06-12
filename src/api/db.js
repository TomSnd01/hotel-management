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
                ('Hotel Los Angeles'), 
                ('Hotel Singapur'), 
                ('Hotel Berlin')
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
                AusstattungID INT,
                Preis DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (AusstattungID) REFERENCES Ausstattung(AusstattungID),
                FOREIGN KEY (HotelID) REFERENCES Hotels(HotelID)
            )`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Created rooms table.");
        db.run(`
            INSERT INTO Zimmer (HotelID, Zimmernummer, ZimmerTyp, Preis) VALUES 
                -- Hotel Los Angeles
                (1, '101', 'Einzelzimmer', 100.00), (1, '102', 'Einzelzimmer', 100.00), (1, '103', 'Einzelzimmer', 100.00), (1, '104', 'Einzelzimmer', 100.00), (1, '105', 'Einzelzimmer', 100.00),
                (1, '106', 'Einzelzimmer', 100.00), (1, '107', 'Einzelzimmer', 100.00), (1, '108', 'Einzelzimmer', 100.00), (1, '109', 'Einzelzimmer', 100.00), (1, '110', 'Einzelzimmer', 100.00),
                (1, '201', 'Doppelzimmer', 150.00), (1, '202', 'Doppelzimmer', 150.00), (1, '203', 'Doppelzimmer', 150.00), (1, '204', 'Doppelzimmer', 150.00), (1, '205', 'Doppelzimmer', 150.00),
                (1, '206', 'Doppelzimmer', 150.00), (1, '207', 'Doppelzimmer', 150.00), (1, '208', 'Doppelzimmer', 150.00), (1, '209', 'Doppelzimmer', 150.00), (1, '210', 'Doppelzimmer', 150.00),
                (1, '301', 'Suite', 300.00), (1, '302', 'Suite', 300.00), (1, '303', 'Suite', 300.00), (1, '304', 'Suite', 300.00),

                -- Hotel Singapur
                (2, '101', 'Einzelzimmer', 120.00), (2, '102', 'Einzelzimmer', 120.00), (2, '103', 'Einzelzimmer', 120.00), (2, '104', 'Einzelzimmer', 120.00), (2, '105', 'Einzelzimmer', 120.00),
                (2, '106', 'Einzelzimmer', 120.00), (2, '107', 'Einzelzimmer', 120.00), (2, '108', 'Einzelzimmer', 120.00), (2, '109', 'Einzelzimmer', 120.00), (2, '110', 'Einzelzimmer', 120.00),
                (2, '201', 'Doppelzimmer', 170.00), (2, '202', 'Doppelzimmer', 170.00), (2, '203', 'Doppelzimmer', 170.00), (2, '204', 'Doppelzimmer', 170.00), (2, '205', 'Doppelzimmer', 170.00),
                (2, '206', 'Doppelzimmer', 170.00), (2, '207', 'Doppelzimmer', 170.00), (2, '208', 'Doppelzimmer', 170.00), (2, '209', 'Doppelzimmer', 170.00), (2, '210', 'Doppelzimmer', 170.00),
                (2, '301', 'Suite', 320.00), (2, '302', 'Suite', 320.00), (2, '303', 'Suite', 320.00), (2, '304', 'Suite', 320.00),

                -- Hotel Berlin
                (3, '101', 'Einzelzimmer', 110.00), (3, '102', 'Einzelzimmer', 110.00), (3, '103', 'Einzelzimmer', 110.00), (3, '104', 'Einzelzimmer', 110.00), (3, '105', 'Einzelzimmer', 110.00),
                (3, '106', 'Einzelzimmer', 110.00), (3, '107', 'Einzelzimmer', 110.00), (3, '108', 'Einzelzimmer', 110.00), (3, '109', 'Einzelzimmer', 110.00), (3, '110', 'Einzelzimmer', 110.00),
                (3, '201', 'Doppelzimmer', 160.00), (3, '202', 'Doppelzimmer', 160.00), (3, '203', 'Doppelzimmer', 160.00), (3, '204', 'Doppelzimmer', 160.00), (3, '205', 'Doppelzimmer', 160.00),
                (3, '206', 'Doppelzimmer', 160.00), (3, '207', 'Doppelzimmer', 160.00), (3, '208', 'Doppelzimmer', 160.00), (3, '209', 'Doppelzimmer', 160.00), (3, '210', 'Doppelzimmer', 160.00),
                (3, '301', 'Suite', 310.00), (3, '302', 'Suite', 310.00), (3, '303', 'Suite', 310.00), (3, '304', 'Suite', 310.00);
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
        console.log("Created bookings table.");
        db.run(`
            INSERT INTO Buchungen (KundeID, ZimmerID, CheckInDatum, CheckOutDatum, Gesamtpreis) VALUES 
                -- Hotel Los Angeles Buchungen
                (1, 1, '2024-01-01', '2024-01-10', 900.00),
                (2, 2, '2024-01-11', '2024-01-20', 900.00),
                (3, 3, '2024-01-21', '2024-01-30', 900.00),
                (4, 4, '2024-02-01', '2024-02-10', 900.00),
                (5, 5, '2024-02-11', '2024-02-20', 900.00),
                (6, 6, '2024-02-21', '2024-03-01', 900.00),
                (7, 7, '2024-03-01', '2024-03-10', 900.00),
                (8, 8, '2024-03-11', '2024-03-20', 900.00),
                (9, 9, '2024-03-21', '2024-03-30', 900.00),
                (10, 10, '2024-04-01', '2024-04-10', 900.00),

                -- Hotel Singapur Buchungen
                (1, 25, '2024-01-01', '2024-01-10', 1200.00),
                (2, 26, '2024-01-11', '2024-01-20', 1200.00),
                (3, 27, '2024-01-21', '2024-01-30', 1200.00),
                (4, 28, '2024-02-01', '2024-02-10', 1200.00),
                (5, 29, '2024-02-11', '2024-02-20', 1200.00),
                (6, 30, '2024-02-21', '2024-03-01', 1200.00),
                (7, 31, '2024-03-01', '2024-03-10', 1200.00),
                (8, 32, '2024-03-11', '2024-03-20', 1200.00),
                (9, 33, '2024-03-21', '2024-03-30', 1200.00),
                (10, 34, '2024-04-01', '2024-04-10', 1200.00),

                -- Hotel Berlin Buchungen
                (1, 49, '2024-01-01', '2024-01-10', 1100.00),
                (2, 50, '2024-01-11', '2024-01-20', 1100.00),
                (3, 51, '2024-01-21', '2024-01-30', 1100.00),
                (4, 52, '2024-02-01', '2024-02-10', 1100.00),
                (5, 53, '2024-02-11', '2024-02-20', 1100.00),
                (6, 54, '2024-02-21', '2024-03-01', 1100.00),
                (7, 55, '2024-03-01', '2024-03-10', 1100.00),
                (8, 56, '2024-03-11', '2024-03-20', 1100.00),
                (9, 57, '2024-03-21', '2024-03-30', 1100.00),
                (10, 58, '2024-04-01', '2024-04-10', 1100.00);
            `, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Inserted data into Buchungen table.");
        });
    });
});
