// src/pages/Menu.js
import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Menu.css';

const dishes = [
  { id: 1, name: "Spaghetti Carbonara", description: "Classic Italian pasta with a creamy sauce.", price: 12.99 },
  { id: 2, name: "Margherita Pizza", description: "Fresh mozzarella, tomatoes, and basil on a crispy crust.", price: 10.99 },
  { id: 3, name: "Caesar Salad", description: "Romaine lettuce, croutons, and Caesar dressing.", price: 8.99 },
  { id: 4, name: "Grilled Salmon", description: "Fresh salmon fillet grilled to perfection.", price: 15.99 },
  { id: 5, name: "Chocolate Cake", description: "Rich chocolate cake with a gooey center.", price: 6.99 },
];

function Menu({ addOrder }) {
  return (
    <Box className="menu-container">
      <Typography className="menu-title" gutterBottom>Menu</Typography>
      
      {/* My Orders Button */}
      <Button 
        className="orders-button"
        component={Link} // Use Link for navigation
        to="/orders" // Navigate to the Orders page
      >
        My Orders
      </Button>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {dishes.map((dish) => (
          <Card key={dish.id} className="dish-card">
            <CardContent>
              <Typography className="dish-name">{dish.name}</Typography>
              <Typography className="dish-description" color="text.secondary">{dish.description}</Typography>
              <Typography className="dish-price">${dish.price.toFixed(2)}</Typography>
              {/* Call addOrder when button is clicked */}
              <Button className="order-button" onClick={() => addOrder(dish)}>
                Order Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Menu;
