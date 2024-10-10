// src/components/PropertyForm.js
import React, { useState } from 'react';
import { createProperty } from '../utils';
import Swal from 'sweetalert2';

function PropertyForm({ account }) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createProperty(name, location, type, area, price, account);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Property created successfully!',
            });
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
            console.error('Failed to create property:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <h2>Add a New Property</h2>
            <div className="mb-3">
                <label>Property Name</label>
                <input type="text" className="form-control" onChange={e => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label>Location</label>
                <input type="text" className="form-control" onChange={e => setLocation(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label>Type</label>
                <select className="form-select" onChange={e => setType(e.target.value)} required>
                    <option value="">Select Type</option>
                    <option value="0">Apartment</option>
                    <option value="1">Villa</option>
                    <option value="2">Land</option>
                </select>
            </div>
            <div className="mb-3">
                <label>Area</label>
                <input type="number" className="form-control" onChange={e => setArea(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label>Price</label>
                <input type="number" className="form-control" onChange={e => setPrice(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default PropertyForm;