const GreenFunds = artifacts.require("GreenFunds");

// Deploy GreenFunds contract
module.exports = function(deployer) {
  deployer.deploy(GreenFunds);
};