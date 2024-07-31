    import React, { useState, useEffect } from 'react';
    import { Container, Row, Col, Button, Card } from 'react-bootstrap';
    import { Link } from 'react-router-dom';
    import axios from 'axios';
    import './Home.css'; // Custom CSS file

    const Home = () => {
        const [featuredProducts, setFeaturedProducts] = useState([]);
        const [newProducts, setNewProducts] = useState([]);
        const [cart, setCart] = useState([]);

        const userId = localStorage.getItem('userId'); // Get user ID from local storage
        console.error('User ID', userId);

        useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const response = await axios.get('http://localhost:8081/products');
                    if (Array.isArray(response.data)) {
                        const featured = response.data.filter(product => product.featured);
                        const newProds = response.data.filter(product => product.type === 'NEW');
                        setFeaturedProducts(featured);
                        setNewProducts(newProds);
                    } else {
                        console.error('Unexpected data format:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };

            fetchProducts();
        }, []);

        const addToCart = async (product) => {
            if (!userId) {
                console.error('User not logged in');
                return;
            }

            try {
                const response = await axios.post('http://localhost:8081/cart_item', {
                    user: { id: userId },
                    product: { id: product.id },
                    quantity: 1
                });

                if (response.status === 200) {
                    setCart(prevCart => [...prevCart, product]);
                    console.log('Product added to cart:', product);
                } else {
                    console.error('Error adding to cart:', response.data);
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        };

        return (
            <Container className="mt-5">
                {/* Hero Section */}
                <div className="hero-section text-center mb-5">
                    <h1>Welcome to the Yazan Shop</h1>
                    <p>Discover our range of products and find the best deals!</p>
                    <Button as={Link} to="/products" variant="primary">Shop Now</Button>
                </div>

                {/* Featured Products */}
                <section className="featured-products mb-5">
                    <h2>Featured Products</h2>
                    <Row>
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map(product => (
                                <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                                    <Card>
                                        <Card.Img variant="top" src={product.image} alt={product.name} />
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>{product.description}</Card.Text>
                                            <Card.Text><strong>${product.price.toFixed(2)}</strong></Card.Text>
                                            <Button variant="primary" as={Link} to={`/products/${product.id}`}>View Details</Button>
                                            <Button variant="secondary" onClick={() => addToCart(product)} className="ms-2">Add to Cart</Button>
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

                {/* New Products */}
                <section className="new-products mb-5">
                    <h2>New Products</h2>
                    <Row>
                        {newProducts.length > 0 ? (
                            newProducts.map(product => (
                                <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                                    <Card>
                                        <Card.Img variant="top" src={product.image} alt={product.name} />
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>{product.description}</Card.Text>
                                            <Card.Text><strong>${product.price.toFixed(2)}</strong></Card.Text>
                                            <Button variant="primary" as={Link} to={`/products/${product.id}`}>View Details</Button>
                                            <Button variant="secondary" onClick={() => addToCart(product)} className="ms-2">Add to Cart</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center">
                                <p>No new products available at the moment.</p>
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
