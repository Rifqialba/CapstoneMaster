const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

// Route untuk mendapatkan semua data Pokemon
router.get("/pokemons", pokemonController.getPokemons);

// Route untuk menambahkan data Pokemon
router.post("/pokemons", pokemonController.addPokemon);

/// Route untuk memperbarui data Pokemon (edit)
router.put("/pokemons", pokemonController.updatePokemon);

// Route untuk delete data Pokemon
router.delete("/pokemons/:id", pokemonController.deletePokemon);

module.exports = router;
