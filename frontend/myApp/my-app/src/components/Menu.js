// src/components/Menu.js
import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <BootstrapNavbar bg="primary" variant="dark" expand="lg">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/">Products Shop</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                        <Nav.Link as={Link} to="/shopinfo">Shop Info</Nav.Link>

                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Menu;
