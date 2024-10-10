// src/App.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import LandingPage from './components/LandingPage';
import PropertiesList from './components/PropertiesList';
import UserProfile from './components/UserProfile';
import PropertyForm from './components/PropertyForm';

function App() {
    const [account, setAccount] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            alert("MetaMask not found");
        }
    };

    return (
        <Router>
            <div className="App">
                <Menu account={account} connectWallet={connectWallet} />
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<LandingPage account={account} connectWallet={connectWallet} />} />
                        <Route path="/properties" element={<PropertiesList account={account} />} />
						<Route path="/add-property" element={<PropertyForm account={account} />} />
                        <Route path="/profile" element={<UserProfile account={account} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;