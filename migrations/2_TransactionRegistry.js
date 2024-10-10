var TransactionRegistry = artifacts.require("./TransactionRegistry.sol");
module.exports = function (deployer) {
  deployer.deploy(TransactionRegistry);
};