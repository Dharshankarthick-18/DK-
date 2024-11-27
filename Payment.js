// src/pages/Payment.js
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import axiosInstance from '../axiosInstance'; // Import your Axios instance
import './Payment.css';

function Payment({ orders = [], onConfirmPayment, quantities = {} }) { // Default to empty object
  // Calculate total amount from the orders including their quantities
  const totalAmount = orders.reduce((total, order) => {
    const quantity = quantities[order.id] || 1; // Get the quantity for the order, default to 0
    return total + order.price * quantity; // Calculate total based on price and quantity
  }, 0).toFixed(2);

  const handlePayment = async () => {
    try {
      // Send a POST request to your payment endpoint with quantities
      await axiosInstance.post('/payment', { orders, quantities }); // Adjust the endpoint according to your backend
      onConfirmPayment(); // Call the confirmation function passed as a prop
      alert('Payment Confirmed!'); // Notify user
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.'); // Notify user of failure
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Payment</Typography>
      <Typography>Complete your payment securely here.</Typography>
      
      <Box sx={{ mt: 2, width: '100%', maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>Order Summary</Typography>
        <List>
          {orders.length === 0 ? (
            <ListItem>
              <ListItemText primary="No orders available." />
            </ListItem>
          ) : (
            orders.map((order) => {
              const quantity = quantities[order.id] || 1; // Default to 0 if not defined
              const totalPrice = (order.price * quantity).toFixed(2); // Calculate total price for this item
              return (
                <ListItem key={order.id}>
                  <ListItemText 
                    primary={`${order.name} (x${quantity})`} // Show name and quantity
                    secondary={`Price: $${order.price.toFixed(2)} - Total: $${totalPrice}`} 
                  />
                </ListItem>
              );
            })
          )}
        </List>
        <Typography variant="h6" gutterBottom>Total Amount: ${totalAmount}</Typography>
      </Box>

      {/* Add Payment Method Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>Select Payment Method:</Typography>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>Credit Card</Button>
        <Button variant="contained" color="secondary">PayPal</Button>
      </Box>

      {/* Confirm Payment Button */}
      <Button 
        variant="contained" 
        color="success" 
        sx={{ mt: 3 }} 
        onClick={handlePayment} // Use handlePayment function
      >
        Confirm Payment
      </Button>
    </Box>
  );
}

export default Payment;
