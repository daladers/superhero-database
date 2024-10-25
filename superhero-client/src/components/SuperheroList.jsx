import { useState, useEffect } from 'react';
import { Box, Grid2, Typography, Button, CircularProgress, Alert, Card, CardMedia, CardContent } from '@mui/material';
import { getSuperheroes } from '../api/superheroApi';

const SuperheroList = ({ onSelect }) => {
  const [superheroes, setSuperheroes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuperheroes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getSuperheroes(currentPage);
        if (response?.data?.superheroes) {
          setSuperheroes(response.data.superheroes);
          setTotalPages(response.data.totalPages || 1);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching superheroes:', error);
        setError('Failed to load superheroes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchSuperheroes();
  }, [currentPage]);

  if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h3" gutterBottom>Superheroes database</Typography>
      <Grid2 container spacing={3}>
        {superheroes.map((hero) => (
          <Grid2 xs={12} sm={6} md={4} key={hero._id}>
            <Card onClick={() => onSelect(hero._id)} sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardMedia
                component="img"
                height="200"
                image={hero.images[0] || '/uploads/placeholder.png'}
                alt={hero.nickname}
                onError={(e) => {
                  e.target.onerror = null;
                }}
              />
              <CardContent>
                <Typography variant="h6" color='#0B192C' component="div">{hero.nickname}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Button 
          variant="contained" 
          color="primary" 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          sx={{ marginRight: '1rem' }}
        >
          Previous
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SuperheroList;
