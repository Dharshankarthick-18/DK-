import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import axiosInstance from '../axiosInstance';

function AdminHome() {
  const [dishes, setDishes] = useState([]);
  const [newDishName, setNewDishName] = useState('');
  const [newAvailableStock, setNewAvailableStock] = useState('');
  const [newNeededStock, setNewNeededStock] = useState('');

  // Fetch dishes from the backend
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axiosInstance.get('/dishes'); // Adjust endpoint accordingly
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  // Handle adding a new dish
  const handleAddDish = async () => {
    try {
      const newDish = {
        name: newDishName,
        availableStock: Number(newAvailableStock),
        neededStock: Number(newNeededStock),
      };

      const response = await axiosInstance.post('/dishes', newDish); // Adjust endpoint accordingly
      setDishes([...dishes, response.data]); // Add new dish to the state
      setNewDishName('');
      setNewAvailableStock('');
      setNewNeededStock('');
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  // Handle deleting a dish
  const handleDeleteDish = async (dishId) => {
    try {
      await axiosInstance.delete(`/dishes/${dishId}`); // Adjust endpoint accordingly
      setDishes(dishes.filter(dish => dish.id !== dishId)); // Remove dish from state
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Available Dishes</Typography>
      <List>
        {dishes.map((dish) => (
          <ListItem key={dish.id}>
            <ListItemText
              primary={dish.name}
              secondary={`Available: ${dish.availableStock} - Needed: ${dish.neededStock}`}
            />
            <Button color="error" onClick={() => handleDeleteDish(dish.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ mt: 3 }}>Add New Dish</Typography>
      <TextField
        label="Dish Name"
        value={newDishName}
        onChange={(e) => setNewDishName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Available Stock"
        type="number"
        value={newAvailableStock}
        onChange={(e) => setNewAvailableStock(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Needed Stock"
        type="number"
        value={newNeededStock}
        onChange={(e) => setNewNeededStock(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleAddDish}
      >
        Add Dish
      </Button>
    </Box>
  );
}

export default AdminHome;
