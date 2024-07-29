// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import Products from './components/Products';
import Menu from './components/Menu';

const App = () => {
    const location = useLocation();
    const noMenuPaths = ['/', '/signup'];

    return (
        <>
            {!noMenuPaths.includes(location.pathname) && <Menu />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
