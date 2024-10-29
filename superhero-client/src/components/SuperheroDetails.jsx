import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardMedia,
  Grid2,
  Alert,
} from "@mui/material";
import { getSuperhero, deleteSuperhero } from "../api/superheroApi";

const SuperheroDetails = ({ superheroId, onBack, onEdit }) => {
  const [superhero, setSuperhero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getSuperhero(superheroId)
      .then((response) => setSuperhero(response.data))
      .catch((error) => {
        console.error("Error fetching superhero details:", error);
        setError("Failed to fetch superhero details. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [superheroId]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this superhero?")) {
      deleteSuperhero(superheroId)
        .then(() => {
          alert("Superhero deleted successfully");
          onBack(); // Navigate back to the superhero list
        })
        .catch((error) => {
          console.error("Error deleting superhero:", error);
          setError("Failed to delete superhero. Please try again later.");
        });
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!superhero) return <Alert severity="warning">No superhero found.</Alert>;

  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: "#1e1e1e",
        borderRadius: "8px",
        color: "#fff",
      }}
    >
      <Typography variant="h2" gutterBottom>
        {superhero.nickname}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Real name:</strong> {superhero.real_name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Origin:</strong> {superhero.origin_description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Superpowers:</strong> {superhero.superpowers}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Catch phrase:</strong> {superhero.catch_phrase}
      </Typography>

      <Grid2 container spacing={2} className="image-gallery">
        {superhero.images.length > 0 ? (
          superhero.images.map((image, index) => (
            <Grid2 xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={image}
                  alt={`${superhero.nickname}-${index}`}
                  sx={{ width: 150, height: 150, objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/uploads/placeholder.png";
                  }}
                />
              </Card>
            </Grid2>
          ))
        ) : (
          <Typography>No images available for this superhero.</Typography>
        )}
      </Grid2>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <Button variant="contained" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" onClick={() => onEdit(superheroId)}>
          Edit
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default SuperheroDetails;
