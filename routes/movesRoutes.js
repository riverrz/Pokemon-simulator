const express = require("express");
const router = express.Router()
const Moves = require("../data/pokedex/moves.json");

router.get("/:id", (req, res) => {
    const move = Moves.filter(move => move.id === Number(req.params.id))[0];
    res.json(move);
});

module.exports = router;