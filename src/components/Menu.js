// src/components/Menu.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Menu({ account, connectWallet }) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
            <Navbar.Brand as={Link} to="/">Real Estate DApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/properties">Properties</Nav.Link>
                    <Nav.Link as={Link} to="/add-property">Add Property</Nav.Link>
                    {account && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
                </Nav>
                <Navbar.Text className="mx-4">
                    {account ? `Connected: ${account}` : "Not Connected"}
                </Navbar.Text>
                {!account && <Button variant="outline-light" onClick={connectWallet}>Connect Wallet</Button>}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Menu;