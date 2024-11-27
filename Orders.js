// src/pages/Orders.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axiosInstance from '../axiosInstance';
import './Orders.css';

function Orders({ orders, onCancelOrder, setOrders }) {
  // State to manage quantity for each order item
  const [quantities, setQuantities] = useState({});

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders'); // Adjust endpoint accordingly
        setOrders(response.data);
        // Initialize quantities state
        const initialQuantities = {};
        response.data.forEach((order) => {
          initialQuantities[order.id] = 1; // Default quantity of 1
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [setOrders]);

  // Calculate total amount
  const totalAmount = orders.reduce((total, order) => {
    const quantity = quantities[order.id] || 1; // Get quantity for the current order
    return total + order.price * quantity; // Update total based on quantity
  }, 0).toFixed(2);

  return (
    <Box className="orders-container">
      <Typography className="orders-title" gutterBottom>Your Orders</Typography>
      {orders.length === 0 ? (
        <Typography className="no-orders">No orders yet. Start ordering from the menu!</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <ListItem key={order.id} className="order-item">
              <ListItemText
                primary={order.name}
                secondary={`Price: $${order.price.toFixed(2)} - Status: ${order.status}`}
              />
              {/* Quantity Input */}
              <TextField
                type="number"
                value={quantities[order.id]|| 1} // Default to 1 if undefined
                onChange={(e) => {
                  const newQuantity = Math.max(1, Number(e.target.value)); // Ensure quantity is at least 1
                  setQuantities((prev) => ({ ...prev, [order.id]: newQuantity }));
                }}
                inputProps={{ min: 1 }} // Prevent negative numbers
                sx={{ width: '60px', marginLeft: '16px' }} // Style the input
              />
              <Button 
                className="cancel-button" 
                onClick={() => onCancelOrder(order.id)} // Use order.id for cancellation
                sx={{ marginLeft: '16px' }} // Space between input and button
              >
                Cancel
              </Button>
            </ListItem>
          ))}
        </List>
      )}
      <Typography className="total-amount">
        Total Amount: ${totalAmount}
      </Typography>

      {/* Payment Button to navigate to Payment page */}
      <Button 
        className="proceed-button" 
        component={Link} // Use Link for navigation
        to={{
          pathname: "/payment", // Navigate to Payment page
          state: { orders, quantities } // Pass orders and quantities to Payment page
        }} 
      >
        Proceed to Payment
      </Button>
    </Box>
  );
}

export default Orders;
