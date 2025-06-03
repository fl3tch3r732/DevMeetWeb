import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
//import { useAuth } from '../context/useAuth'

export default function Homescreen() {

  const [users, setUsers] = useState([])
 

useEffect(() => {
  fetch('http://localhost:3000/api/user')
    .then(res => res.json())
    .then(data => {
      setUsers(data.data);
      console.log('Fetched users:', data);
      console.log('Type:', typeof data); 
       // Do something with the user data
    })
    .catch(err => console.error('Error:', err));
}, []);


  return (
    <div className='bg-slate-200'>
       <NavBar />
   <h1 className="text-4xl font-bold text-center mb-10 text-gray-700">Connect with Developers</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
    {users.map((user, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105"
      >
        {/* Avatar or Initials Placeholder */}
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mb-4">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        {/* User Details */}
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.city}</p>
        <p className="text-sm text-gray-600 mt-1 text-center">{user.skills}</p>

        {/* Connect Button */}
        <button className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition">
          Connect
        </button>
      </div>
    ))}
  </div>
    </div>
 
  )
}
