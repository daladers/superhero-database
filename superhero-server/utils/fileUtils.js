const fs = require("fs");
const path = require("path");

// Delete files from the filesystem
exports.deleteFiles = (imageUrls) => {
  imageUrls.forEach((imageUrl) => {
    const imagePath = path.join(__dirname, "../", imageUrl);
    fs.unlink(imagePath, (err) => {
      if (err) console.error(`Error deleting image ${imagePath}:`, err);
    });
  });
};
