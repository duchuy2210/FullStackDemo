import "./App.scss";

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NavBar from "./components/Navbar";


function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;