# GreenFunds

Code repository and supporting documents for GreenFunds project by the Misfits for E-Hack '21

Watch the demo video [here]().

![Overview](https://raw.githubusercontent.com/skhiearth/GreenFunds/main/Devfolio%20Screens/1.png)

Recently, a lot of companies have been pledging funds towards their sustainability goals, but they don't offer any insight into their real actions. GreenFunds is a transparent and accountable platform that allows companies to be accountable for their goals.

GreenFunds utilizes transparency, security, and accountability of the Ethereum and Polygon blockchains to render a platform that can be used by companies, investment banks, hedge funds, and individuals to pledge cryptocurrency towards their sustainability goals. Activists, NGOs, and organizations active in this space can apply for these funds.

The platform not only brings companies and activists together, but also provides auditors, customers, and executives to keep a tab on the movement of funds. This allows the governmental agencies to keep a check on the companies' funds - ensuring they aren't evading taxes in the name of the environment and allows companies to build trust with their customers.

### Companies
1. Can use GreenFunds to issue sustainability-focus funds.
2. Use cryptocurrency instead of Fiat Currency to issue such funds bringing in features like - asset class, borderless payments, low transaction fees
3. Find relevant activists & environmentalists

### Auditors and General Public
1. Can use the platform to monitor the transactions of the company.
2. Government can use it to ensure that companies are not evading taxes in the name of sustainability.

### NGOs, Activists, and Environmentalists
1. GreenFunds allows the voices of those who are actually working for the environment to be heard. Activists can directly plead their case to the fund issuer and claim their part with a simple application.
2. Recieve payment in crypto - enabling truly worldwide ecological movements.


![Transparency](https://raw.githubusercontent.com/skhiearth/GreenFunds/main/Devfolio%20Screens/2.png)

## Instructions to run the project locally 
1. Go into the root folder of the project, named `SupplyChain` and run `npm install`.
2. Inside the root folder, run `truffle compile` to compile the Solidity smart contract to their JSON ABIs.
3. Run `truffle migrate --reset --network matic` to migrate the smart contracts to the Matic Mumbai test network or `truffle migrate --reset --network ropsten` to migrate to the Ropsten Test Network.
4. After migration, run `npm start` to start the Web Application.

Note: If you want to use your own account to deploy the contracts, open the `.truffle-config.js` file and change the mnemonic to yours. To get the mnemonic of your account, you can go to Account Settings on Metamask or Export Account on Portis.

Note: If you deploy using a personal account, MATIC/ETH tokens are required in your account. You can request tokens using the publically available [faucet for the Polygon Matic Mumbai network](https://faucet.matic.network/) or [faucets for the Ropsten network](https://faucet.ropsten.be/).

![Authentication](https://raw.githubusercontent.com/skhiearth/GreenFunds/main/Devfolio%20Screens/4.png)

## Tech Stack:
* Smart Contracts: [Solidity](https://solidity.readthedocs.io/en/v0.7.3/)
* Wallet Integration: [Portis](https://www.portis.io/)
* Blockchain Network: [Polygon](https://polygon.technology/) and [Ethereum Ropsten Test Network](https://ethereum.org/en/developers/docs/networks/)
* Front-end: [React](https://reactjs.org/)
* Package Manager: [npm](https://www.npmjs.com/)

![P](https://raw.githubusercontent.com/skhiearth/GreenFunds/main/Devfolio%20Screens/3.png)
![Polygon](https://raw.githubusercontent.com/skhiearth/GreenFunds/main/Devfolio%20Screens/5.png)