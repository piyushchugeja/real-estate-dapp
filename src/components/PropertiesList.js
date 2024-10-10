// src/components/PropertiesList.js
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { buyProperty, getOwnerProperties, getProperties, realEstateInstance } from '../utils';
import Swal from 'sweetalert2';

function PropertiesList({ account }) {
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const allProperties = await getProperties();
                setProperties(allProperties);
            } catch (error) {
                console.error("Failed to fetch properties:", error);
            }
        };
        fetchProperties();

        realEstateInstance.events.PropertyCreated({ fromBlock: 'latest' }).on('data', async () => {
            fetchProperties();
        }
        );

        realEstateInstance.events.PropertySold({ fromBlock: 'latest' }).on('data', async () => {
            fetchProperties();
        }
        );
    }, []);

    const handleBuy = async (id, price) => {
        try {
            var hash = await buyProperty(id, price, account);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Property bought successfully! <br> Transaction Hash: ${hash}`,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
            console.error("Failed to buy property:", error);
        }
    }

    const types = ['Apartment', 'Villa', 'Land'];
    const imageUrls = [
        '/assets/apartment.png',
        '/assets/villa.png',
        '/assets/land.png'
    ];

    return (
        <div className="row mt-4">
            {properties.length === 0 ? (
                <div className="col-12">
                    <p>No properties available.</p>
                </div>
            ) : (
                properties.map(property => (
                    <div className="col-md-4" key={property.id}>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={imageUrls[property.propertyType]}
                                style={{ width: '250px', height: '250px', margin: 'auto', display: 'block' }}
                            />
                            <Card.Body>
                                <Card.Title>{property.name}</Card.Title>
                                <Card.Text>
                                    Location: {property.location}<br />
                                    Type: {types[property.propertyType]}<br />
                                    Area: {property.area.toString()} sq.ft<br />
                                    Price: {property.price.toString()} ETH<br />
                                    Owner: {
                                        account === property.owner ? 'You' : <code>{property.owner}</code>
                                    }
                                </Card.Text>
                                {account !== property.owner && (
                                    <Button variant="primary" onClick={() => handleBuy(property.id, property.price)}>Buy</Button>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                ))
            )}
        </div>
    );
}

export default PropertiesList;