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
        `CREATE TABLE IF NOT EXISTS hotels (
        id INTEGER PRIMARY KEY,
        name TEXT,
        location TEXT
      )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Created items table.");
            //   Close the database connection after all insertions are done
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Closed the database connection.");
            });
        }
    );
});
