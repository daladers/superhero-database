const express = require("express");
const multer = require("multer");
const path = require("path");
const imageController = require("../controllers/imageController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Upload images for a superhero
router.post(
  "/:id/images",
  upload.array("images", 5),
  imageController.uploadImages
);

// Remove multiple images from a superhero
router.put("/:id/remove-images", imageController.removeImages);

module.exports = router;
