// src/components/Navbar.js
import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg">
            <Container>
            {userId &&<BootstrapNavbar.Brand as={Link} to="/">Home</BootstrapNavbar.Brand>}
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    {userId && <Nav.Link as={Link} to="/products">Products</Nav.Link>}
                    {userId && <Nav.Link as={Link} to="/cart">Cart</Nav.Link>}
                    {userId && <Nav.Link as={Link} to="/shopinfo">Shop Info</Nav.Link>}

                    </Nav>
                    <Nav>
                        {!userId ? (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        ) : (
                            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</Nav.Link>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
