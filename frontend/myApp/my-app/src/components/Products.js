import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Products.css'; // Custom CSS for styling

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [type, setType] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let results = products;

        if (searchTerm) {
            results = results.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            results = results.filter(product => {
                const price = parseFloat(product.price.replace('$', ''));
                return price >= minPrice && price <= maxPrice;
            });
        }

        if (type) {
            results = results.filter(product => product.type === type);
        }

        if (isNew) {
            results = results.filter(product => product.isNew);
        }

        if (isFeatured) {
            results = results.filter(product => product.isFeatured);
        }

        setFilteredProducts(results);
    }, [searchTerm, priceRange, type, isNew, isFeatured, products]);

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Products</h1>

            {/* Filter Controls */}
            <Form className="mb-4">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="priceRange" className="mt-3">
                    <Form.Label>Price Range</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter price range (e.g., 10-50)"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="type" className="mt-3">
                    <Form.Label>Product Type</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product type (e.g., electronics)"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="isNew" className="mt-3">
                    <Form.Check
                        type="checkbox"
                        label="New Arrivals"
                        checked={isNew}
                        onChange={(e) => setIsNew(e.target.checked)}
                    />
                </Form.Group>
                <Form.Group controlId="isFeatured" className="mt-3">
                    <Form.Check
                        type="checkbox"
                        label="Featured"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                </Form.Group>
            </Form>

            {/* Product Grid */}
            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                            <Card className="product-card">
                                <Card.Img variant="top" src={product.image || '/default-image.jpg'} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text><strong>{product.price}</strong></Card.Text>
                                    <Button variant="primary" as={Link} to={`/products/${product.id}`}>View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col className="text-center">
                        <p>No products found.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Products;
