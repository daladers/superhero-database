const express = require("express");
const router = express.Router();
const superheroController = require("../controllers/superheroController");

// Create a new superhero
router.post("/", superheroController.createSuperhero);

// Get a paginated list of superheroes
router.get("/", superheroController.getSuperheroes);

// Get a specific superhero by ID
router.get("/:id", superheroController.getSuperheroById);

// Update a superhero
router.put("/:id", superheroController.updateSuperhero);

// Delete a superhero
router.delete("/:id", superheroController.deleteSuperhero);

module.exports = router;
