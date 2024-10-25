import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  Modal,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const ImageUploader = ({ existingImages, onImagesChange }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [visibleImages, setVisibleImages] = useState(existingImages);
  const [selectedImage, setSelectedImage] = useState(null);
  const maxImages = 5;
  const maxFileSizeMB = 20;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (
      selectedFiles.length + visibleImages.length + imageFiles.length >
      maxImages
    ) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }

    const tooLargeFiles = selectedFiles.filter(
      (file) => file.size / 1024 / 1024 > maxFileSizeMB
    );
    if (tooLargeFiles.length > 0) {
      alert(`Each image must be smaller than ${maxFileSizeMB}MB.`);
      return;
    }

    setImageFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...selectedFiles];
      onImagesChange(updatedFiles, imagesToDelete);
      return updatedFiles;
    });
  };

  const markImageForDeletion = (imageUrl) => {
    if (!imagesToDelete.includes(imageUrl)) {
      setImagesToDelete((prevImages) => [...prevImages, imageUrl]);
      setVisibleImages((prevImages) =>
        prevImages.filter((image) => image !== imageUrl)
      );
    }
    onImagesChange(imageFiles, [...imagesToDelete, imageUrl]);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    return () => {
      imageFiles.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [imageFiles]);

  useEffect(() => {
    setVisibleImages(existingImages);
  }, [existingImages]);

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Typography variant="h6">Upload Images</Typography>
      <Button variant="contained" component="label">
        Upload Images
        <input type="file" multiple hidden onChange={handleFileChange} />
      </Button>

      {/* Existing Images */}
      {visibleImages.length > 0 && (
        <Box sx={{ marginTop: "1rem" }}>
          <Typography variant="h6">Existing Images</Typography>
          <Box display="flex" flexWrap="wrap">
            {visibleImages.map((image, index) => (
              <Card
                key={index}
                sx={{
                  margin: "10px",
                  position: "relative",
                  cursor: "pointer",
                  "&:hover .overlay": { opacity: 1 },
                }}
              >
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Existing image ${index}`}
                  sx={{ width: 100, height: 100 }}
                  onClick={() => handleImageClick(image)}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.4)",
                    opacity: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "opacity 0.3s",
                  }}
                >
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      markImageForDeletion(image);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={() => handleImageClick(image)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* New Images */}
      {imageFiles.length > 0 && (
        <Box sx={{ marginTop: "1rem" }}>
          <Typography variant="h6">New Images</Typography>
          <Box display="flex" flexWrap="wrap">
            {imageFiles.map((file, index) => (
              <Card
                key={index}
                sx={{
                  margin: "10px",
                  position: "relative",
                  cursor: "pointer",
                  "&:hover .overlay": { opacity: 1 },
                }}
                onClick={() => handleImageClick(URL.createObjectURL(file))}
              >
                <CardMedia
                  component="img"
                  src={URL.createObjectURL(file)}
                  alt={`New image ${index}`}
                  sx={{ width: 100, height: 100 }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.4)",
                    opacity: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "opacity 0.3s",
                  }}
                >
                  <IconButton sx={{ color: "white" }}>
                    <VisibilityIcon />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* Modal for Enlarged Image */}
      <Modal open={!!selectedImage} onClose={closeImageModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "80%",
            maxHeight: "80%",
          }}
        >
          <img
            src={selectedImage}
            alt="Enlarged"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={closeImageModal}
            sx={{ marginTop: "1rem" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageUploader;
