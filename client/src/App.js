import "./App.css";
import Auth from "./components/Auth/Auth";

import { ethers } from "ethers";
import Reconchain from "./artificats/contracts/Reconchain.sol/Reconchain.json";
// The contract address
const reconchainAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
var eventBlocks = new Set();
const regex = /'([^']+)'/;

function App() {
  // Helper Functions
  // Requests access to the user's Meta Mask Account
  // https://metamask.io/
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
  
  async function createCompanyProfile() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        reconchainAddress,
        Reconchain.abi,
        signer
      );

      await contract.createCompanyProfile(
        "Infodys",
        "ayush@rma"
      );
      contract.on("CompanyProfileCreated", function (address, event) {
        console.log("Result Company Address", address);
      });
    }
  }
  async function createJobPosting() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        reconchainAddress,
        Reconchain.abi,
        signer
      );

      try {
        const transaction = await contract.createJobPosting(
          "SDE",
          "description - @rma"
        );
        contract.on("JobPostingCreated", function (address, index, event) {
          let blockNumber = event.blockNumber;
          if (eventBlocks.has(blockNumber)) return;
          eventBlocks.add(blockNumber);
          console.log("Block Number - ", event);
          console.log(
            "Result Job posting Address",
            address,
            " Index - ",
            Number(index)
          );
          console.log("Block Number - ", eventBlocks);
          
        });
      } catch (error) {
        console.log("Error is ", regex.exec(error.reason)[1]);
      }
    }
  }
  return (
    <div>
      <Auth></Auth>
    </div>
  );
}

export default App;
