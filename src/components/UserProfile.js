import React, { useEffect, useState } from 'react';
import { getOwnerProperties, getPropertiesCount, getTransactionsByAccount, getTransactionDetails } from '../utils';
import Swal from 'sweetalert2';

function UserProfile({ account }) {
    const [propertyCount, setPropertyCount] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get all properties to calculate total value
                const properties = await getOwnerProperties(account);
                setPropertyCount(properties.length);
                
                let total = 0;
                for (const property of properties) {
                    total += parseInt(property.price);
                }
                setTotalValue(total);

                // Get transactions for the user
                const transactionHashes = await getTransactionsByAccount(account);
                const transactionDetailsPromises = transactionHashes.map(hash => getTransactionDetails(hash));
                const transactionsDetails = await Promise.all(transactionDetailsPromises);
                setTransactions(transactionsDetails);
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            }
        };

        if (account) {
            fetchData();
        }
    }, [account]);

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <p><strong>Wallet address:</strong> <code>{account}</code></p>
            <p><strong>Property Count:</strong> {propertyCount}</p>
            <p><strong>Total Value of Properties:</strong> {totalValue} ETH</p>

            <h3>Transactions</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Property ID</th>
                        <th>Amount (ETH)</th>
                        <th>Buyer</th>
                        <th>Seller</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.propertyId.toString()}</td>
                            <td>{transaction.amount.toString()}</td>
                            <td><code>{transaction.buyer}</code></td>
                            <td><code>{transaction.seller}</code></td>
                            <td>{new Date(Number(transaction.timestamp) * 1000).toLocaleString()
                                }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserProfile;