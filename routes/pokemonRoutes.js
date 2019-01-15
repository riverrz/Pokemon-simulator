const express = require("express");
const Pokemons = require("../data/pokedex/pokemon.json");
const router = express.Router()

router.get("/names", (req, res) => {
  res.json(Pokemons.map(pokemon => pokemon.name));
});
router.get("/:name", (req, res) => {
  res.json(Pokemons.filter(pokemon => pokemon.name === req.params.name)[0]);
});

module.exports = router;
