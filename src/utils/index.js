// src/utils/index.js
import Web3 from 'web3';
import RealEstateContract from '../contracts/RealEstate.json';
import TransactionRegistryContract from '../contracts/TransactionRegistry.json';
import Swal from 'sweetalert2';

let web3;
let realEstateInstance;
let transactionRegistryInstance;

web3 = new Web3(window.ethereum);

realEstateInstance = new web3.eth.Contract(
    RealEstateContract.abi,
    "0x05Dd6A26953b31A28dce2b0f1ec9516b4b92dd33"
);

transactionRegistryInstance = new web3.eth.Contract(
    TransactionRegistryContract.abi,
    "0x74e6A0bAdfE638843Dd6F040040Fb0E104C9b8dE"
);

export { realEstateInstance, transactionRegistryInstance };

// Export functions to interact with the contracts here, e.g., createProperty, buyProperty, getProperties, etc.

export const createProperty = async (name, location, propertyType, area, price, account) => {
    try {
        await realEstateInstance.methods.createProperty(name, location, propertyType, area, price).send({ from: account });
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
};

export const getPropertiesCount = async () => {
    try {
        return await realEstateInstance.methods.getPropertiesCount().call();
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
};

export const getPropertyById = async (id) => {
    try {
        return await realEstateInstance.methods.getPropertyById(id).call();
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
};

export const buyProperty = async (id, value, account) => {
    try {
        var buyer = account;
        var seller = await getPropertyOwner(id);
        await realEstateInstance.methods.buyProperty(id).send({ from: buyer, value });
        const transactionId = await transactionRegistryInstance.methods.recordTransaction(id, value, seller, buyer).send({ from: account });
        return transactionId;
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
};

export const getPropertyOwner = async (id) => {
    try {
        return await realEstateInstance.methods.getPropertyOwner(id).call();
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
};

export const getOwnerProperties = async (account) => {
    try {
        return await realEstateInstance.methods.getOwnerProperties().call({ from: account });
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
};

export const getProperties = async () => {
    try {
        const propertiesCount = await realEstateInstance.methods.getPropertiesCount().call();
        const properties = [];

        for (let i = 0; i < propertiesCount; i++) {
            const property = await realEstateInstance.methods.properties(i).call();
            properties.push(property);
        }

        return properties;
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
};

export const getTransactionsByAccount = async (account) => {
    try {
        return await transactionRegistryInstance.methods.getTransactionsByAccount(account).call();
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
};

export const getTransactionDetails = async (transactionHash) => {
    try {
        return await transactionRegistryInstance.methods.getTransactionDetails(transactionHash).call();
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
};