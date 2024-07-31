import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatedQuantities, setUpdatedQuantities] = useState({});
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [cartResponse, productResponse] = await Promise.all([
                    axios.get('http://localhost:8081/cart_item'),
                    axios.get('http://localhost:8081/products')
                ]);

                if (Array.isArray(cartResponse.data) && Array.isArray(productResponse.data)) {
                    setCartItems(cartResponse.data);
                    setProducts(productResponse.data);
                } else {
                    console.error('Unexpected data format:', {
                        cartData: cartResponse.data,
                        productData: productResponse.data
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getUserCartItems = () => {
        if (!userId) return [];

        const productMap = new Map();
        for (const product of products) {
            productMap.set(product.id, product);
        }

        const result = [];
        for (const cartItem of cartItems) {
            const product = productMap.get(cartItem.product.id);
            if (product && cartItem.user && String(cartItem.user.id) === String(userId)) {
                result.push({ ...cartItem, product });
            }
        }
        return result;
    };

    const userCartItems = getUserCartItems();

    const handleQuantityChange = (id, newQuantity) => {
        setUpdatedQuantities({
            ...updatedQuantities,
            [id]: newQuantity
        });
    };

    const handleUpdateQuantity = async (id) => {
        try {
            await axios.put(`http://localhost:8081/cart_item/${id}`, {
                quantity: updatedQuantities[id] || 1 // Fallback to 1 if no quantity is provided
            });
            // Optionally refetch the cart items or update the state
            alert('Quantity updated successfully!');
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity.');
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/cart_item/${id}`);
            // Remove the item from local state
            setCartItems(cartItems.filter(item => item.id !== id));
            alert('Item removed successfully!');
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Failed to remove item.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Your Cart</h1>
            {userCartItems.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCartItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.product.name}</td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={updatedQuantities[item.id] || item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        min="1"
                                    />
                                </td>
                                <td>${item.product.price}</td>
                                <td>
                                    <Button
                                        variant="success"
                                        onClick={() => handleUpdateQuantity(item.id)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="ms-2"
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
