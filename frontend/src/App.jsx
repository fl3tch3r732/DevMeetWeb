import React from "react";
import { Routes, Route } from "react-router-dom"; // <-- Add this line
import Homescreen from "./screens/Homescreen";
import LogIn from "./screens/LogIn";
import SignUp from './screens/SignUp';
import { useAuth } from "./context/useAuth"; // <-- Import useAuth hook
import ProfilePage from "./screens/ProfilePage";
import UserProfile from "./screens/PublicProfile";
import PublicProfile from "./screens/PublicProfile2";
import SignUp2 from "./screens/SignUp2";
import RequestsPage from "./screens/RequestsPage";
import Connections from "./screens/Connections";
import ChatPage from "./screens/ChatPage";
import InboxPage from "./screens/InboxPage";


function App() {

  const {token}  = useAuth();

  return (
    <div className="App">
    
    <Routes>
      {token ? (
          <>
            <Route path="/Home" element={<Homescreen />} />
            <Route path="login" element={<LogIn />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/publicprofile/:id" element={<PublicProfile />} />
            <Route path="*" element={<Homescreen />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup2" element={<SignUp2 />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/chat/:otherUserId" element={<ChatPage />} />

            <Route path="/inbox" element={<InboxPage />} />


          </>
        ) : (
          <>
          <Route path="login" element={<LogIn />} />
          <Route path="/signup2" element={<SignUp2 />} />
          {/* <Route path="/Home" element={<Homescreen />} /> */}
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/requests" element={<RequestsPage />} />
          <Route path="/connections" element={<Connections />} /> */}
          </>
        )}
    </Routes>
    </div>
  );
}


export default App;