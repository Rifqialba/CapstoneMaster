const express = require("express");
const pokemonRoutes = require("./routes/ pokemonRoutes");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware

app.use(
  cors({
    origin: "*", // Izinkan semua asal (untuk pengujian)
  })
);

app.use(express.json());

// Menggunakan routes
app.use("/api", pokemonRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
