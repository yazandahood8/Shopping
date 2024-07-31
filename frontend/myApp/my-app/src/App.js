// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Example path
import SignUp from './components/Signup'; // Example path
import Login from './components/Login'; // Example path
import Cart from './components/Cart'; // Import Cart component
import Products from './components/Products'; // Import Products component
import Navbar from './components/Navbar'; // Import Navbar component
import ShopInfo from './components/ShopInfo'; // Import Navbar component

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<Products />} /> {/* Add route for Products */}
                <Route path="/shopinfo" element={<ShopInfo />} />

            </Routes>
        </Router>
    );
}

export default App;
