import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Welcome to Item Management System</h1>
          <p className="lead">
            A simple application demonstrating role-based permissions and CRUD operations.
          </p>
        </Col>
      </Row>
      
      {user ? (
        <Row>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Browse Items</Card.Title>
                <Card.Text>
                  View all items that you have access to based on your role.
                </Card.Text>
                <Button as={Link} to="/items" variant="primary">
                  View Items
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Create New Item</Card.Title>
                <Card.Text>
                  Add a new item to the system.
                </Card.Text>
                <Button as={Link} to="/items/add" variant="success">
                  Add Item
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          {user.role === 'admin' && (
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Admin Dashboard</Card.Title>
                  <Card.Text>
                    Access administrative features and user management.
                  </Card.Text>
                  <Button as={Link} to="/admin" variant="danger">
                    Admin Panel
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      ) : (
        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Card.Text>
                  Already have an account? Sign in to access the system.
                </Card.Text>
                <Button as={Link} to="/login" variant="primary">
                  Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Register</Card.Title>
                <Card.Text>
                  New to the system? Create an account to get started.
                </Card.Text>
                <Button as={Link} to="/register" variant="success">
                  Register
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;