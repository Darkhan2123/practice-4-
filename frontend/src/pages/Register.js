import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Register = ({ setCurrentUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await AuthService.register(
        formData.username,
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.role
      );
      
      // If registration returns a token, use it directly
      if (result && result.token) {
        const userInfo = {
          token: result.token,
          username: formData.username,
          role: formData.role
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        setCurrentUser(userInfo);
        navigate('/');
      } else {
        // Otherwise, log in the user
        const user = await AuthService.login(formData.username, formData.password);
        setCurrentUser(user);
        navigate('/');
      }
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      if (error.response && error.response.data) {
        // Get specific error messages from the API
        const serverErrors = error.response.data;
        if (typeof serverErrors === 'object') {
          const firstError = Object.values(serverErrors)[0];
          if (Array.isArray(firstError) && firstError.length > 0) {
            errorMessage = firstError[0];
          }
        }
      }
      setError(errorMessage);
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            name="username"
            placeholder="Choose a username" 
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            placeholder="Enter your email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            placeholder="Choose a password" 
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="text" 
            name="firstName"
            placeholder="Enter your first name" 
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text" 
            name="lastName"
            placeholder="Enter your last name" 
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Select 
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
          <Form.Text className="text-muted">
            Note: In a real application, admin role would typically require approval
          </Form.Text>
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
    </div>
  );
};

export default Register;