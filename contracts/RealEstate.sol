// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract RealEstate {
    enum PropertyType { Villa, Apartment, Land } 

    struct Property {
        uint id;
        string name;
        string location;
        PropertyType propertyType;
        uint area; 
        uint price;
        address owner;
    }

    Property[] public properties;
    uint public nextId = 1;

    event PropertyCreated(uint id, string name, string location, uint price, address owner);
    event PropertySold(uint id, address oldOwner, address newOwner, uint price);

    function createProperty(string memory name, string memory location, PropertyType propertyType, uint area, uint price) public {
        properties.push(Property(nextId, name, location, propertyType, area, price, msg.sender));
        emit PropertyCreated(nextId, name, location, price, msg.sender);
        nextId++;
    }
    
    function getPropertiesCount() public view returns(uint) {
        return properties.length;
    }

    function getPropertyById(uint id) public view returns(Property memory) {
        for(uint i = 0; i < properties.length; i++) {
            if(properties[i].id == id) {
                return properties[i];
            }
        }
        revert("Property not found");
    }

    function buyProperty(uint id) public payable {
        for (uint i = 0; i < properties.length; i++) {
            if (properties[i].id == id) {
                require(msg.value == properties[i].price, "Invalid amount");
                address oldOwner = properties[i].owner;
                address payable payableOldOwner = payable(oldOwner);
                payableOldOwner.transfer(msg.value);
                properties[i].owner = msg.sender;
                
                emit PropertySold(id, oldOwner, msg.sender, msg.value);
                return;
            }
        }
        revert("Property not found");
    }

    function getPropertyOwner(uint id) public view returns(address) {
        for(uint i = 0; i < properties.length; i++) {
            if(properties[i].id == id) {
                return properties[i].owner;
            }
        }
        revert("Property not found");
    }

    function getOwnerProperties() public view returns(Property[] memory) {
        uint counter = 0;
        for(uint i = 0; i < properties.length; i++) {
            if(properties[i].owner == msg.sender) {
                counter++;
            }
        }
        
        Property[] memory result = new Property[](counter);
        uint index = 0;
        for(uint i = 0; i < properties.length; i++) {
            if(properties[i].owner == msg.sender) {
                result[index] = properties[i];
                index++;
            }
        }
        
        return result;
    }
}