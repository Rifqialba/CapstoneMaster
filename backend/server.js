const express = require("express");
const pokemonRoutes = require("./routes/ pokemonRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", pokemonRoutes);
app.use("/api", userRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
