import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ItemService from '../services/item.service';

const ItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (isEditMode) {
      const fetchItem = async () => {
        try {
          setFetchLoading(true);
          const item = await ItemService.getItemById(id);
          setFormData({
            name: item.name,
            description: item.description,
            price: item.price
          });
        } catch (error) {
          console.error('Error fetching item:', error);
          setError('Failed to fetch item details. Please try again.');
        } finally {
          setFetchLoading(false);
        }
      };
      
      fetchItem();
    }
  }, [id, isEditMode]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const priceValue = parseFloat(formData.price);
      
      if (isNaN(priceValue)) {
        throw new Error('Price must be a valid number');
      }
      
      const itemData = {
        name: formData.name,
        description: formData.description,
        price: priceValue
      };
      
      console.log('Submitting item data:', itemData);
      
      if (isEditMode) {
        await ItemService.updateItem(id, itemData);
      } else {
        await ItemService.createItem(itemData);
      }
      
      navigate('/items');
    } catch (error) {
      console.error('Error saving item:', error);
      
      let errorMessage = `Failed to ${isEditMode ? 'update' : 'create'} item.`;
      
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        
        // Try to extract field errors
        if (typeof responseData === 'object') {
          const fieldErrors = Object.entries(responseData)
            .map(([field, errors]) => {
              if (Array.isArray(errors) && errors.length > 0) {
                return `${field}: ${errors[0]}`;
              }
              return null;
            })
            .filter(error => error !== null);
            
          if (fieldErrors.length > 0) {
            errorMessage += ' ' + fieldErrors.join(', ');
          }
        } else if (typeof responseData === 'string') {
          errorMessage += ' ' + responseData;
        }
      } else if (error.message) {
        errorMessage += ' ' + error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  if (fetchLoading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>{isEditMode ? 'Edit Item' : 'Add New Item'}</h1>
        </Col>
      </Row>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name"
            placeholder="Enter item name" 
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3}
            name="description"
            placeholder="Enter item description" 
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control 
            type="number" 
            name="price"
            placeholder="Enter item price" 
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={loading} className="me-2">
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              {isEditMode ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            isEditMode ? 'Update Item' : 'Create Item'
          )}
        </Button>
        
        <Button variant="secondary" as={Link} to="/items">
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default ItemForm;