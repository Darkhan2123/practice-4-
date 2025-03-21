import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav, Table, Badge, Spinner, Alert } from 'react-bootstrap';
import UserService from '../services/user.service';
import ItemService from '../services/item.service';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersData, profilesData, itemsData] = await Promise.all([
          UserService.getAllUsers(),
          UserService.getAllProfiles(),
          ItemService.getAllItems()
        ]);
        
        setUsers(usersData);
        setProfiles(profilesData);
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setError('Failed to fetch admin data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }
  
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Admin Dashboard</h1>
          <p className="lead">
            Manage users, profiles, and items across the system.
          </p>
        </Col>
      </Row>
      
      <Tab.Container id="admin-tabs" defaultActiveKey="users">
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="users">Users</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="profiles">Profiles</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="items">Items</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="users">
                <h3>User Management</h3>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="profiles">
                <h3>User Profiles</h3>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.map(profile => (
                      <tr key={profile.id}>
                        <td>{profile.id}</td>
                        <td>{profile.user.username}</td>
                        <td>
                          <Badge bg={profile.role === 'admin' ? 'danger' : 'primary'}>
                            {profile.role}
                          </Badge>
                        </td>
                        <td>{new Date(profile.created_at).toLocaleDateString()}</td>
                        <td>{new Date(profile.updated_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="items">
                <h3>Item Management</h3>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Created By</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>{item.created_by.username}</td>
                        <td>{new Date(item.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default AdminDashboard;