import { Link } from "react-router-dom";
import "./App.css";


function App() {
  return(
    <div>
      <div>Home</div>
      <Link to="/signup">Sign Up</Link>
      <button>Sign Up</button>
    </div>
    
  );
}

export default App;
