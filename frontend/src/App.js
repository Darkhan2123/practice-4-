import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Components
import NavigationBar from './components/NavigationBar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Items from './pages/Items';
import ItemForm from './pages/ItemForm';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

// Services
import AuthService from './services/auth.service';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user) {
          // If we have a user in local storage, validate the token by making a test request
          try {
            const axios = require('axios');
            await axios.get('/api/users/me/', {
              headers: AuthService.getAuthHeader()
            });
            // If the request succeeds, the token is valid
            setCurrentUser(user);
          } catch (error) {
            console.error('Error validating token:', error);
            // If the token is invalid, log the user out
            AuthService.logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <NavigationBar user={currentUser} handleLogout={handleLogout} />
      <Container className="mt-3">
        <Routes>
          <Route path="/" element={<Home user={currentUser} />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register setCurrentUser={setCurrentUser} />} />
          
          <Route 
            path="/items" 
            element={
              <PrivateRoute user={currentUser}>
                <Items user={currentUser} />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/items/add" 
            element={
              <PrivateRoute user={currentUser}>
                <ItemForm user={currentUser} />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/items/edit/:id" 
            element={
              <PrivateRoute user={currentUser}>
                <ItemForm user={currentUser} />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <PrivateRoute user={currentUser}>
                <Profile user={currentUser} />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <PrivateRoute user={currentUser} adminRequired={true}>
                <AdminDashboard user={currentUser} />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;