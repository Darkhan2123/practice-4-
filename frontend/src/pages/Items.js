import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemService from '../services/item.service';
import ItemCard from '../components/ItemCard';

const Items = ({ user }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');
  
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await ItemService.getAllItems();
      setItems(data);
      setError('');
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to fetch items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchItems();
  }, []);
  
  const handleDelete = async (id) => {
    try {
      await ItemService.deleteItem(id);
      setItems(items.filter(item => item.id !== id));
      setDeleteSuccess('Item deleted successfully');
      setTimeout(() => setDeleteSuccess(''), 3000);
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };
  
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Items</h1>
          <p className="lead">
            Browse and manage items. {user.role === 'admin' ? 'As an admin, you can see all items.' : 'You can only see your own items.'}
          </p>
        </Col>
        <Col className="text-end">
          <Button as={Link} to="/items/add" variant="success">
            Add New Item
          </Button>
        </Col>
      </Row>
      
      {deleteSuccess && <Alert variant="success">{deleteSuccess}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {items.length > 0 ? (
            items.map(item => (
              <Col md={6} lg={4} key={item.id}>
                <ItemCard item={item} user={user} onDelete={handleDelete} />
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center my-5">
                No items found. Click "Add New Item" to create one.
              </p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Items;