import React from "react";
import { Routes, Route } from "react-router-dom"; // <-- Add this line
import Homescreen from "./screens/Homescreen";
import LogIn from "./screens/LogIn";
import SignUp from './screens/SignUp';
import { useAuth } from "./context/useAuth"; // <-- Import useAuth hook
import ProfilePage from "./screens/ProfilePage";
import UserProfile from "./screens/PublicProfile";


function App() {

  const {token}  = useAuth();

  return (
    <div className="App">
    
    <Routes>
      {token ? (
          <>
            <Route path="/Home" element={<Homescreen />} />
            <Route path="/" element={<LogIn />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="*" element={<Homescreen />} />
          </>
        ) : (
          <>
            
          <Route path="/signup" element={<SignUp />} />
          </>
        )}
    </Routes>
    </div>
  );
}

export default App;