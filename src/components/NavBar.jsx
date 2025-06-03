import React, { useState } from 'react'
import "./NavBar.css"
import Homescreen from '../screens/Homescreen';
import Login from '../screens/LogIn'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';


export default function NavBar() {

  const navigate = useNavigate();

    const {logout, token} = useAuth();
    const links = [
        { name: 'Home', onClick: () => navigate('/Home') },
        {name: 'About', onClick: () => navigate('') },
        { name: 'Product', onClick: () => window.location.href = "#product"  },
        { name: 'Features', onClick: () => window.location.href = "#features" },
        { name: 'Gallery', onClick: () => window.location.href = "#gallery" },]
   
    const [activeTab, setActiveTab]=useState(links[0].name);
    const tabs = [links[0].name, links[1].name, links[2].name, links[3].name, links[4].name]

    const handleLogout = () => {
    logout();             // clear token from context + localStorage
    navigate('/login');   // redirect to login screen
  };
  
   console.log('token:', token);


  return ( 
    <div className='flex justify-evenly'>
    <h2 className='p-5 text-lg font-bold'>DevMeet</h2>

   <div className='nav-bar'>
     <ul className="navbar">
       {tabs.map((tab)=>(
        <li
        key={tab}
        className={`tab ${activeTab===tab ? 'active' : ''}`}
        onClick={()=> {setActiveTab(tab)
          links.find((link) => link.name === tab).onClick && links.find((link) => link.name === tab).onClick()
          
        }}
        
        >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </li>
       ))}
     </ul>
     </div>
      {token? ( <button className='flex justify-center items-center  bg-black text-white rounded-full border-gray-2 w-30 h-10 mt-3 cursor-pointer'
        onClick={handleLogout}
        >Logout</button>):(<></>)} 

  </div>
  )
}
