import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { useState } from "react";

import Greeter from "./artificats/contracts/greetings.sol/Greeter.json";
import Reconchain from "./artificats/contracts/Reconchain.sol/Reconchain.json";
import "./App.css";
import Auth from "./components/Auth/Auth";

// The contract address
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const reconchainAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {
  // Property Variables

  const [message, setMessage] = useState("");
  const [currentGreeting, setCurrentGreeting] = useState("");

  // Helper Functions

  // Requests access to the user's Meta Mask Account
  // https://metamask.io/
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Fetches the current value store in greeting
  async function fetchGreeting() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        // Call Greeter.greet() and display current greeting in `console`
        /* 
           function greet() public view returns (string memory) {
             return greeting;
           }
         */
        console.log("Yaha tak aaya");
        const data = await contract.greet();
        console.log("data: ", data);
        setCurrentGreeting(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  // Sets the greeting from input text box
  async function setGreeting() {
    if (!message) return;

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create contract with signer
      /*
         function setGreeting(string memory _greeting) public {
           console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
           greeting = _greeting;
         } 
       */
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(message);

      setMessage("");
      await transaction.wait();
      console.log("yaha bhi aaya set waale me");
      fetchGreeting();
    }
  }

  async function createCandidateProfile() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create contract with signer
      /*
         function setGreeting(string memory _greeting) public {
           console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
           greeting = _greeting;
         } 
       */
      const contract = new ethers.Contract(
        reconchainAddress,
        Reconchain.abi,
        signer
      );

      contract.on("CandidateProfileCreated", function (event) {
        console.log("Result Candidate Address", event);
      });
    }
  }
  return (
    <div>
      {/* <div>App</div> */}
      {/* <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link> */}
      <Auth></Auth>
      <button
        onClick={createCandidateProfile}
        style={{ backgroundColor: "green" }}
      >
        createCandidateProfile
      </button>
      <div style={{}}>
        <div className="custom-buttons">
          <button onClick={fetchGreeting} style={{ backgroundColor: "green" }}>
            Fetch Greeting
          </button>
          <button onClick={setGreeting} style={{ backgroundColor: "red" }}>
            Set Greeting
          </button>
        </div>
        {/* INPUT TEXT - String  */}
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Set Greeting Message"
        />

        {/* Current Value stored on Blockchain */}
        <h2 className="greeting">Greeting: {currentGreeting}</h2>
      </div>
    </div>
  );
}

export default App;
