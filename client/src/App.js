import { Link } from "react-router-dom";
import "./App.css";


function App() {
  return(
    <div>
      <div>App</div>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
    </div>
    
  );
}

export default App;
