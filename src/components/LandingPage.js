// src/components/LandingPage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LandingPage({ account }) {
    return (
        <div className="container mt-4">
            <header className="text-center mb-5">
                <h1>Welcome to the Real Estate DApp</h1>
                <p className="lead">Discover, Buy, and Sell Properties with Ease</p>
                {account && <p>Your Account: {account}</p>}
            </header>

            <section className="text-center mb-5">
                <h2>Types of Properties</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="/assets/villa.png" className="card-img-top" alt="Villa"
                                style={{ width: '250px', height: '250px', margin: 'auto', display: 'block' }} />
                            <div className="card-body">
                                <h5 className="card-title">Villa</h5>
                                <p className="card-text">Luxurious villas with modern amenities.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="/assets/apartment.png" className="card-img-top" alt="Apartment"
                                style={{ width: '250px', height: '250px', margin: 'auto', display: 'block' }} />
                            <div className="card-body">
                                <h5 className="card-title">Apartment</h5>
                                <p className="card-text">Stylish apartments in prime locations.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="/assets/land.png" className="card-img-top" alt="Land"
                                style={{ width: '160px', height: '160px', margin: '30px auto', display: 'block' }} />
                            <div className="card-body">
                                <h5 className="card-title">Land</h5>
                                <p className="card-text">Invest in plots of land for future development.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-center mb-5">
                <h2>Why Choose Our DApp?</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Secure Transactions</h5>
                                <p className="card-text">Utilize blockchain technology for secure and transparent property transactions.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Easy Access</h5>
                                <p className="card-text">Access property listings and transactions directly from your wallet.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Diverse Listings</h5>
                                <p className="card-text">Explore a wide range of properties from villas to apartments and land.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="text-center">
                <p>© 2024 Real Estate DApp. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LandingPage;