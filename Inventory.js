import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
// Uncomment the line below when you're ready to use the API
// import axiosInstance from '../axiosInstance';

function Inventory() {
  // State to manage inventory items
  const [inventory, setInventory] = useState([]);

  // Sample inventory data for demonstration
  const sampleInventoryData = [
    { id: 1, name: "Spaghetti", availableStock: 50, neededStock: 20 },
    { id: 2, name: "Burger", availableStock: 30, neededStock: 15 },
    { id: 3, name: "Salad", availableStock: 25, neededStock: 10 },
    { id: 4, name: "Pizza", availableStock: 40, neededStock: 5 },
    { id: 5, name: "Soda", availableStock: 100, neededStock: 50 },
  ];

  useEffect(() => {
    // Uncomment the fetchInventory function when ready to fetch from API
    const fetchInventory = async () => {
      try {
        // Simulating API response with sample data
        // const response = await axiosInstance.get('/inventory');
        // setInventory(response.data);

        // For now, set the sample data directly
        setInventory(sampleInventoryData);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Inventory</Typography>
      <List>
        {inventory.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Available: ${item.availableStock} - Needed: ${item.neededStock}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Inventory;
