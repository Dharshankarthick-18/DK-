import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css'; // Import the external CSS file

function Home() {
  return (
    <Box className="home-container"> {/* Apply external styles */}
      <Typography variant="h4" gutterBottom className="welcome-title">
        Welcome to Our Restaurant!
      </Typography>
      <Typography variant="h6" className="subheading">
        Discover the flavors of our delicious menu!
      </Typography>
      
      <Box className="image-container">
        <img 
          src="https://via.placeholder.com/300" // Replace with a real image URL
          alt="Restaurant"
          className="restaurant-image" // Apply external styles
        />
      </Box>

      <Typography className="description">
        Join us for an unforgettable dining experience. Our chefs use the freshest ingredients to craft mouth-watering dishes that you will love!
      </Typography>

      {/* Updated Button to use Link for navigation */}
      <Button 
        variant="contained" 
        className="menu-button" // Apply external styles
        component={Link} // Use Link as a component
        to="/menu" // Set the target route
      >
        View Menu
      </Button>
    </Box>
  );
}

export default Home;
