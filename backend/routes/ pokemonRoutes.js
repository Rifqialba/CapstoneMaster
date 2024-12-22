const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.get("/pokemons", pokemonController.getPokemons);

router.post("/pokemons", pokemonController.addPokemon);

router.put("/pokemons", pokemonController.updatePokemon);

router.delete("/pokemons/:id", pokemonController.deletePokemon);

module.exports = router;
