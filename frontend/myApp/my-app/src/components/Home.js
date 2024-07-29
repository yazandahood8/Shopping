// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Assuming you will add custom CSS in this file

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/products');
                // Filter products to include only those with Featured == true
                const featuredProducts = response.data.filter(product => product.featured);
                setProducts(featuredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container className="mt-5">
            {/* Hero Section */}
            <div className="hero-section text-center mb-5">
                <h1>Welcome to the Products Shop</h1>
                <p>Discover our range of products and find the best deals!</p>
                <Button as={Link} to="/products" variant="primary">Shop Now</Button>
            </div>

            {/* Featured Products */}
            <section className="featured-products mb-5">
                <h2>Featured Products</h2>
                <Row>
                    {products.length > 0 ? (
                        products.map(product => (
                            <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                                <Card>
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
                            <p>No featured products available at the moment.</p>
                        </Col>
                    )}
                </Row>
            </section>

            {/* Testimonials */}
            <section className="testimonials mb-5">
                <h2>What Our Customers Say</h2>
                <Row>
                    <Col sm={12} md={6}>
                        <blockquote className="blockquote">
                            <p className="mb-0">"Fantastic products and excellent customer service!"</p>
                            <footer className="blockquote-footer">John Doe</footer>
                        </blockquote>
                    </Col>
                    <Col sm={12} md={6}>
                        <blockquote className="blockquote">
                            <p className="mb-0">"The best shopping experience I've ever had."</p>
                            <footer className="blockquote-footer">Jane Smith</footer>
                        </blockquote>
                    </Col>
                </Row>
            </section>

            {/* Call to Action */}
            <section className="cta text-center">
                <h2>Ready to Explore?</h2>
                <p>Don't miss out on our latest products and deals. Sign up now!</p>
                <Button as={Link} to="/signup" variant="secondary">Sign Up</Button>
            </section>
        </Container>
    );
};

export default Home;
