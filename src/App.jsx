import React from "react";
import { Routes, Route } from "react-router-dom"; // <-- Add this line
import Homescreen from "./screens/Homescreen";
import LogIn from "./screens/LogIn";
import SignUp from './screens/SignUp';

function App() {
  return (
    <div className="App">
    
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<LogIn />} /> {/* 👈 THIS */}
      <Route path="/Home" element={<Homescreen />} />
    </Routes>
    </div>
  );
}

export default App;