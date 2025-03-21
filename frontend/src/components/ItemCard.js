import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemCard = ({ item, user, onDelete }) => {
  const isOwner = item.created_by.username === user.username;
  const isAdmin = user.role === 'admin';
  const canEdit = isOwner || isAdmin;
  
  return (
    <Card className="item-card">
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          ${item.price} - Created by {item.created_by.username}
        </Card.Subtitle>
        <Card.Text>{item.description}</Card.Text>
        <Row>
          <Col>
            <small className="text-muted">
              Created: {new Date(item.created_at).toLocaleDateString()}
            </small>
          </Col>
          <Col className="text-end">
            {canEdit && (
              <>
                <Button 
                  as={Link} 
                  to={`/items/edit/${item.id}`} 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                >
                  Edit
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;