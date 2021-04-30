# GreenFunds

Code repository and supporting documents for GreenFunds project by the Misfits for E-Hack '21

Watch the demo video [here]().

![Overview]()



* Authenticity

* Transparency and security
Information in the contract will be visible to all the authorized members of the blockchain. 

* Immutability
Evidence should not be altered during the investigation, in order to be admissible in a legal court process. guaranteeing auditable integrity of the collected evidence i.e. Nobody can alter/ tamper with the evidence

* Traceability 
Tracing a piece of evidence would be easier and less time consuming as every record is time-stamped, facilitating speedy judgments. 

![Screenshot]()

## Instructions to run the project locally 
1. Go into the root folder of the project, named `SupplyChain` and run `npm install`.
2. Inside the root folder, run `truffle compile` to compile the Solidity smart contract to their JSON ABIs.
3. Run `truffle migrate --reset --network matic` to migrate the smart contracts to the Matic Mumbai test network or `truffle migrate --reset --network ropsten` to migrate to the Ropsten Test Network.
4. After migration, run `npm start` to start the Web Application.

Note: If you want to use your own account to deploy the contracts, open the `.truffle-config.js` file and change the mnemonic to yours. To get the mnemonic of your account, you can go to Account Settings on Metamask or Export Account on Portis.

Note: If you deploy using a personal account, MATIC/ETH tokens are required in your account. You can request tokens using the publically available [faucet for the Polygon Matic Mumbai network](https://faucet.matic.network/) or [faucets for the Ropsten network](https://faucet.ropsten.be/).

![Contract Creation]()

## Tech Stack:
* Smart Contracts: [Solidity](https://solidity.readthedocs.io/en/v0.7.3/)
* Wallet Integration: [Portis](https://www.portis.io/)
* Blockchain Network: [Polygon](https://polygon.technology/) and [Ethereum Ropsten Test Network](https://ethereum.org/en/developers/docs/networks/)
* Front-end: [React](https://reactjs.org/)
* Package Manager: [npm](https://www.npmjs.com/)

![Screenshot]()
![Screenshot]()