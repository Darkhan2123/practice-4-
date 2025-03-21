import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import UserService from '../services/user.service';

const Profile = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await UserService.getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
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
          <h1>User Profile</h1>
        </Col>
      </Row>
      
      {profile && (
        <Row>
          <Col md={6} className="mx-auto">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">{profile.user.username}</h4>
                <Badge bg={profile.role === 'admin' ? 'danger' : 'primary'}>
                  {profile.role}
                </Badge>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold">Full Name:</Col>
                  <Col xs={8}>
                    {profile.user.first_name} {profile.user.last_name}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold">Email:</Col>
                  <Col xs={8}>{profile.user.email}</Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold">Role:</Col>
                  <Col xs={8}>{profile.role}</Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold">Created:</Col>
                  <Col xs={8}>
                    {new Date(profile.created_at).toLocaleDateString()}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Last updated: {new Date(profile.updated_at).toLocaleString()}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;