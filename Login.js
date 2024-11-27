import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; // Ensure this path is correct
import './Login.css'; // Import your CSS file for styling

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]); // State to store users fetched from API
  const navigate = useNavigate();

  // Fetch all users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = () => {
    // Hardcoded admin and user login
    if ((username === 'admin' && password === 'admin123') || (username === 'user' && password === 'user123')) {
      onLogin(username === 'admin' ? 'admin' : 'user');
      navigate(username === 'admin' ? '/admin' : '/');
      setError('');
    } else {
      const foundUser = users.find(user => user.username === username && user.password === password);
      if (foundUser) {
        onLogin(username === 'admin' ? 'admin' : 'user');
        navigate('/');
        setError('');
      } else {
        setError('Invalid credentials. Please try again or sign up.');
      }
    }
  };

  const handleSignUp = async () => {
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
      setError('User already exists. Please log in.');
      return;
    }

    // Post new user to the mock server
    try {
      const newUser = { username, password };
      const response = await axiosInstance.post('/users', newUser);
      setUsers([...users, response.data]); // Update users state with the newly created user
      alert('User created successfully! Please log in.');
      setError('');
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Error creating user. Please try again.');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers(users.filter(user => user.id !== id)); // Remove the deleted user from state
      alert('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user.');
    }
  };

  const handleEditUser = async (id) => {
    // Here you'd typically show a form to edit the user details, but for simplicity:
    const updatedPassword = prompt('Enter new password:');
    if (!updatedPassword) return;

    try {
      const updatedUser = { password: updatedPassword };
      const response = await axiosInstance.patch(`/users/${id}`, updatedUser);
      setUsers(users.map(user => (user.id === id ? response.data : user))); // Update the user in state
      alert('User updated successfully.');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error updating user.');
    }
  };

  return (
    <Box
      className="login-container" // Add class for styling
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100vh' }} // Full viewport height
    >
      <Typography variant="h4" className="login-title">Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        fullWidth
        className="login-input" // Add class for styling
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
        className="login-input" // Add class for styling
      />
      {error && <Typography className="error-message">{error}</Typography>}
      <Button
        variant="contained"
        onClick={handleLogin}
        className="login-button" // Add class for styling
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      <Button
        variant="outlined"
        onClick={handleSignUp} // SignUp button to create a new user
        className="signup-button"
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>

      {/* Example of a list of users to view, edit, and delete */}
      <Box mt={4} className="user-list">
        <Typography variant="h5">Users:</Typography>
        {users.map(user => (
          <Box key={user.id} display="flex" alignItems="center" justifyContent="space-between" mt={2}>
            <Typography>{user.username}</Typography>
            <Box>
              <Button variant="contained" color="secondary" onClick={() => handleEditUser(user.id)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDeleteUser(user.id)} sx={{ ml: 2 }}>
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Login;
