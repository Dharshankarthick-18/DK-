import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axiosInstance from '../axiosInstance'; // Assuming you have an axios instance setup

function ProfitManagement() {
  const [dailySales, setDailySales] = useState([]);
  const [salesInput, setSalesInput] = useState(0);
  const [monthProfit, setMonthProfit] = useState(0);
  
  useEffect(() => {
    const fetchDailySales = async () => {
      try {
        const response = await axiosInstance.get('/sales'); // Adjust the endpoint accordingly
        setDailySales(response.data);
      } catch (error) {
        console.error('Error fetching daily sales:', error);
      }
    };

    fetchDailySales();
  }, []);

  // Function to add today's sales
  const addSales = () => {
    if (salesInput > 0) {
      const newSales = { id: dailySales.length + 1, amount: Number(salesInput), date: new Date().toISOString().split('T')[0] };
      setDailySales((prevSales) => [...prevSales, newSales]);
      setSalesInput(0);
    }
  };

  // Calculate monthly profit
  useEffect(() => {
    const totalProfit = dailySales.reduce((total, sale) => total + sale.amount, 0);
    setMonthProfit(totalProfit);
  }, [dailySales]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Profit Management</Typography>
      
      <TextField
        label="Enter Today's Sales"
        type="number"
        value={salesInput}
        onChange={(e) => setSalesInput(e.target.value)}
        sx={{ width: '200px', marginRight: '16px' }}
      />
      <Button variant="contained" onClick={addSales}>Add Sales</Button>

      <Typography variant="h6" sx={{ marginTop: '16px' }}>Monthly Profit: ${monthProfit.toFixed(2)}</Typography>

      <Typography variant="h6" sx={{ marginTop: '16px' }}>Daily Sales:</Typography>
      <List>
        {dailySales.map((sale) => (
          <ListItem key={sale.id}>
            <ListItemText primary={`Date: ${sale.date} - Amount: $${sale.amount}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ProfitManagement;
