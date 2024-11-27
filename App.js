// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Inventory from './pages/Inventory';
import Navbar from './components/Navbar';
import Payment from './pages/Payment';
import './App.css';
import axiosInstance from './axiosInstance';

function App() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleLogin = (role) => {
    setUser({ role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const addOrder = (dish) => {
    const newOrder = { ...dish, status: 'Pending' };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const handleCancelOrder = (index) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  const handleConfirmPayment = () => {
    setOrders([]); // Clear orders after payment confirmation
  };

  return (
    <Router>
      <Container className="container"> {/* Apply class to container */}
        {user && <Navbar user={user} handleLogout={handleLogout} />}
        <Routes>
          {!user && <Route path="*" element={<Navigate to="/login" />} />}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/menu" element={user ? <Menu addOrder={addOrder} /> : <Navigate to="/login" />} />
          <Route path="/orders" element={user ? <Orders orders={orders} onCancelOrder={handleCancelOrder} setOrders={setOrders} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/inventory" element={user && user.role === 'admin' ? <Inventory /> : <Navigate to="/login" />} />
          <Route path="/payment" element={user ? <Payment orders={orders} onConfirmPayment={handleConfirmPayment} /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
