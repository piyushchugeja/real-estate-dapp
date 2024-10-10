// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract TransactionRegistry {
    struct Transaction {
        uint propertyId;
        uint amount;
        address buyer;
        address seller;
        uint timestamp;
    }

    mapping(bytes32 => Transaction) public transactions;
    bytes32[] public transactionHashes;

    event TransactionRecorded(bytes32 transactionHash, uint propertyId, address buyer, address seller, uint amount);

    function recordTransaction(uint propertyId, uint amount, address seller, address buyer) external
    returns (bytes32) {
        bytes32 transactionHash = keccak256(abi.encodePacked(propertyId, buyer, seller, amount, block.timestamp));
        transactions[transactionHash] = Transaction({
            propertyId: propertyId,
            amount: amount,
            buyer: buyer,
            seller: seller,
            timestamp: block.timestamp
        });
        transactionHashes.push(transactionHash);

        emit TransactionRecorded(transactionHash, propertyId, buyer, seller, amount);
        return transactionHash;
    }

    function getTransactionsByAccount(address account) external view returns (bytes32[] memory) {
        bytes32[] memory result = new bytes32[](getTransactionsCountByAccount(account));
        uint counter = 0;

        for (uint i = 0; i < transactionHashes.length; i++) {
            Transaction memory transaction = transactions[transactionHashes[i]];
            if (transaction.buyer == account || transaction.seller == account) {
                result[counter] = transactionHashes[i];
                counter++;
            }
        }
        return result;
    }

    function getTransactionsCountByAccount(address account) internal view returns (uint count) {
        for (uint i = 0; i < transactionHashes.length; i++) {
            Transaction memory transaction = transactions[transactionHashes[i]];
            if (transaction.buyer == account || transaction.seller == account) {
                count++;
            }
        }
        return count;
    }

    function getTransactionDetails(bytes32 transactionHash) external view returns (uint propertyId, uint amount, address buyer, address seller, uint timestamp) {
        Transaction memory transaction = transactions[transactionHash];
        return (transaction.propertyId, transaction.amount, transaction.buyer, transaction.seller, transaction.timestamp);
    }

    function getTransactionsByProperty(uint propertyId) external view returns (bytes32[] memory) {
        bytes32[] memory result = new bytes32[](getTransactionsCountByProperty(propertyId));
        uint counter = 0;

        for (uint i = 0; i < transactionHashes.length; i++) {
            Transaction memory transaction = transactions[transactionHashes[i]];
            if (transaction.propertyId == propertyId) {
                result[counter] = transactionHashes[i];
                counter++;
            }
        }
        return result;
    }

    function getTransactionsCountByProperty(uint propertyId) internal view returns (uint count) {
        for (uint i = 0; i < transactionHashes.length; i++) {
            Transaction memory transaction = transactions[transactionHashes[i]];
            if (transaction.propertyId == propertyId) {
                count++;
            }
        }
        return count;
    }
}