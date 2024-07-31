import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ShopInfo = () => {
    // Static shop information with additional details
    const shopInfo = {
        name: 'Yazan Shop',
        description: 'Welcome to Yazan Shop, your one-stop destination for premium quality products. We pride ourselves on offering top-notch items across various categories to meet your needs and preferences. Our commitment to quality and customer satisfaction is unmatched, and we are dedicated to providing an exceptional shopping experience.',
        contact: 'dahood.yazan8@gmail.com',
        address: '1234 Market Street, Suite 567, Your City, Your Country',
        hours: 'Monday - Friday: 9 AM - 6 PM, Saturday: 10 AM - 4 PM, Sunday: Closed',
        website: 'https://www.yazanshop.com'
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Header className="bg-primary text-white">
                            <h3 className="mb-0">Shop Information</h3>
                        </Card.Header>
                        <Card.Body>
                            <h2 className="text-primary">{shopInfo.name}</h2>
                            <p>{shopInfo.description}</p>
                            <p><strong>Contact Email:</strong> <a href={`mailto:${shopInfo.contact}`}>{shopInfo.contact}</a></p>
                            <p><strong>Address:</strong> {shopInfo.address}</p>
                            <p><strong>Hours of Operation:</strong> {shopInfo.hours}</p>
                            <p><strong>Website:</strong> <a href={shopInfo.website} target="_blank" rel="noopener noreferrer">{shopInfo.website}</a></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ShopInfo;
