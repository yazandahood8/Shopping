import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/users/login', {
                username,
                password
            });
            console.log(response.data);
            if (response.status === 200) {
                navigate('/home'); // Redirect to home page
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Login
                </Button>
                <Button variant="secondary" onClick={handleSignUp} className="mt-3 ms-3">
                    Sign Up
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
