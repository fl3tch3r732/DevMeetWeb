import React, { useState } from 'react'
import "./NavBar.css"
import "./MediaQuerries.css"

export default function NavBar() {


    const links = [
        { name: 'Home', onClick: () => window.location.href = "#home" },
        {name: 'About', onClick: () => window.location.href = "#about"  },
        { name: 'Product', onClick: () => window.location.href = "#product"  },
        { name: 'Features', onClick: () => window.location.href = "#features" },
        { name: 'Gallery', onClick: () => window.location.href = "#gallery" },]
   
    const [activeTab, setActiveTab]=useState(links[0].name);
    const tabs = [links[0].name, links[1].name, links[2].name, links[3].name, links[4].name]


  return ( 
    <div className='flex justify-evenly'>
    <h2 className='p-5 text-lg font-bold'>Arte</h2>

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

        <button className='flex justify-center items-center  bg-black text-white rounded-full border-gray-2 w-30 h-10 mt-3 cursor-pointer'>Explore</button>

  </div>
  
  )
}
