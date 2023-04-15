# reconchain
CS731 Project

STEPS TO RUN THIS PROJECT
- install node
- git clone or download this project files from the repository
- There are 2 main directories - client, server and a .sql file
-- delete package.lock.json files from the files then
- Go to client folder and run >npm install (this will install dependencies)
- Go to server folder and run >npm install (this will install dependencies)
- install hardhat
- Now, you'll have the packages installed (if any package missing use npm to install)
- install MetaMask extension in your browser
- install XAMPP, or other software to run MySQL servers

Go to client folder
- run command >npm run start (Starts React Application)
- run command >npx hardhat compile (Compiles contract)
- run command >npx hardhat node (Run blockchain and gives to accounts to use)
- run command >npx hardhat run scripts/deploy.js --network localhost (Deploy contract on blockchain)

Go to server folder
- run command >node index.js (Starts backend server)

- Add Localhost RPC accounts to MetaMask
- Import accounts by pasting the private keys from blockchain terminal (previous hardhat node command)

- Open localhost/phpmyadmin and import the .sql file to view the database and table data

- Following above steps will get the application get started on localhost on your browser.


