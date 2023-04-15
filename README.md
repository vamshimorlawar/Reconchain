# ReconChain

This project is developed by CS731 Project Group 1, consisting of Ayush Kothiyal, Deepak Mathur, Vinay Agrawal, and Vamshikiran Morlawar. ReconChain is a decentralized platform that facilitates secure, transparent, and efficient communication between parties involved in a construction project.

## Steps to Run the Project

To run this project, follow the below steps:

1. Install Node.js
2. Clone or download this project from the repository.
3. Delete `package.lock.json` files from the client and server folders.
4. Go to the client folder and run `npm install` to install dependencies.
5. Go to the server folder and run `npm install` to install dependencies.
6. Install Hardhat.
7. Now, you'll have the packages installed. If any package is missing, use npm to install it.
8. Install the MetaMask extension in your browser.
9. Install XAMPP or other software to run MySQL servers.
10. Go to the client folder and run the following commands:
    - `npm run start` (Starts the React application)
    - `npx hardhat compile` (Compiles the contract)
    - `npx hardhat node` (Runs the blockchain and gives two accounts to use)
    - `npx hardhat run scripts/deploy.js --network localhost` (Deploys the contract on the blockchain)
11. Go to the server folder and run `node index.js` to start the backend server.
12. Add Localhost RPC accounts to MetaMask.
13. Import accounts by pasting the private keys from the blockchain terminal (previous hardhat node command).
14. Open localhost/phpmyadmin and import the .sql file to view the database and table data.
15. Follow the above steps, and the application will get started on localhost on your browser.

## Technologies Used

ReconChain is developed using the following technologies:

- React
- Node.js
- MySQL
- Solidity
- Hardhat
