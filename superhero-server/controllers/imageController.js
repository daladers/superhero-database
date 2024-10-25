const Superhero = require("../models/superhero");
const { deleteFiles } = require("../utils/fileUtils");

// Upload images for a superhero
exports.uploadImages = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero)
      return res.status(404).json({ error: "Superhero not found" });

    superhero.images.push(...imagePaths);
    await superhero.save();
    res.json(superhero);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove multiple images from a superhero
exports.removeImages = async (req, res) => {
  try {
    const { images } = req.body; // Array of image URLs
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero)
      return res.status(404).json({ error: "Superhero not found" });

    superhero.images = superhero.images.filter(
      (image) => !images.includes(image)
    );
    await superhero.save();

    deleteFiles(images); // Delete images from filesystem
    res.json(superhero);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
