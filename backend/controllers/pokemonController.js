const db = require("../db/db");

// Get all pokemons
exports.getPokemons = (req, res) => {
  const sql = "SELECT * FROM pokemons";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: err.message });
    } else {
      console.log("Fetched pokemons:", results);
      res.json(results);
    }
  });
};

// Handler untuk memperbarui data Pokemon
exports.updatePokemon = (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ error: "ID and name are required" });
  }

  const sql = "UPDATE pokemons SET name = ? WHERE id = ?";
  db.query(sql, [name, id], (err, results) => {
    if (err) {
      console.error("Error updating Pokémon:", err);
      return res.status(500).json({ error: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Pokémon not found" });
    }

    res.json({ message: "Pokémon updated successfully!" });
  });
};

// Delete pokemon
exports.deletePokemon = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM pokemons WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: err.message });
    } else {
      console.log("Deleted pokemon:", result);
      res.json({ message: "Pokemon deleted successfully!" });
    }
  });
};

// Add Pokemon
exports.addPokemon = (req, res) => {
  const {
    id,
    set_name,
    name,
    supertype,
    subtypes,
    types,
    number,
    rarity,
    small_image_url,
    large_image_url,
  } = req.body;

  const sql = `INSERT INTO pokemons (id, set_name, name, supertype, subtypes, types, number, rarity, small_image_url, large_image_url) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      id,
      set_name,
      name,
      supertype,
      subtypes,
      types,
      number,
      rarity,
      small_image_url,
      large_image_url,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding pokemon:", err);
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Pokemon added successfully!" });
      }
    }
  );
};
