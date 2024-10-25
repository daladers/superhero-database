const Superhero = require("../models/superhero");

// Create a new superhero
exports.createSuperhero = async (req, res) => {
  try {
    const superhero = new Superhero(req.body);
    const savedSuperhero = await superhero.save();
    res.status(201).json(savedSuperhero);
  } catch (error) {
    res.status(500).json({ message: 'Error creating superhero', error });
  }
};

// Get a paginated list of superheroes
exports.getSuperheroes = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const superheroes = await Superhero.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Superhero.countDocuments();
    res.json({
      superheroes,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific superhero by ID
exports.getSuperheroById = async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero)
      return res.status(404).json({ error: "Superhero not found" });
    res.json(superhero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a superhero
exports.updateSuperhero = async (req, res) => {
  try {
    const superhero = await Superhero.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!superhero)
      return res.status(404).json({ error: "Superhero not found" });
    res.json(superhero);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a superhero and associated images
exports.deleteSuperhero = async (req, res) => {
  try {
    const superhero = await Superhero.findByIdAndDelete(req.params.id);
    if (!superhero)
      return res.status(404).json({ error: "Superhero not found" });
    // Delete associated images
    const imagePaths = superhero.images;
    require("../utils/fileUtils").deleteFiles(imagePaths);
    res.json({ message: "Superhero deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
