import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import ImageUploader from "./ImageUploader";
import { useSuperheroContext } from "../contexts/SuperheroContext";
import {
  getSuperhero,
  createSuperhero,
  updateSuperhero,
  uploadImages,
  removeImages,
} from "../api/superheroApi";
import { handleApiError } from "../utils/errorHandler";

const SuperheroForm = ({ superheroId, onDone }) => {
  const { setLoading, setError } = useSuperheroContext();
  const [formData, setFormData] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]); // New images to upload
  const [imagesToDelete, setImagesToDelete] = useState([]); // Images marked for deletion

  const fetchSuperheroData = async () => {
    setLoading(true);
    try {
      const response = await getSuperhero(superheroId);
      const data = response.data;

      setFormData({
        nickname: data.nickname,
        real_name: data.real_name,
        origin_description: data.origin_description,
        superpowers: data.superpowers,
        catch_phrase: data.catch_phrase,
        images: data.images || [],
      });
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (superheroId) {
      fetchSuperheroData();
    }
  }, [superheroId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let id = superheroId;

      if (!superheroId) {
        // Create a new superhero and get its ID
        const response = await createSuperhero(formData);
        id = response.data._id; // Store the newly created superhero's ID
      } else {
        // Update the existing superhero
        await updateSuperhero(superheroId, formData);
      }

      // Only upload images if we have a valid ID (created or updated)
      if (id) {
        if (imageFiles.length > 0) {
          await uploadImages(id, imageFiles);
        }
        if (imagesToDelete.length > 0) {
          await removeImages(id, imagesToDelete);
        }
      }

      onDone();
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Nickname"
        name="nickname"
        value={formData.nickname}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Real Name"
        name="real_name"
        value={formData.real_name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Origin Description"
        name="origin_description"
        value={formData.origin_description}
        onChange={handleChange}
        multiline
        rows={4}
        required
        fullWidth
      />
      <TextField
        label="Superpowers"
        name="superpowers"
        value={formData.superpowers}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Catch Phrase"
        name="catch_phrase"
        value={formData.catch_phrase}
        onChange={handleChange}
        fullWidth
      />
      <ImageUploader
        existingImages={formData.images}
        onImagesChange={(newImages, imagesToDelete) => {
          setImageFiles(newImages); // Update new images for upload
          setImagesToDelete(imagesToDelete); // Update images marked for deletion
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={onDone}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save Superhero
        </Button>
      </Box>
    </Box>
  );
};

export default SuperheroForm;
