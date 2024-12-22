const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pokemon_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err); // Log error jika koneksi gagal
    return;
  }
  console.log("Connected to MySQL database"); // Log keberhasilan koneksi
});

module.exports = db;
