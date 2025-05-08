import React from 'react'
import NavBar from '../../components/NavBar'

export default function Homescreen() {

const users =[
    {name:'Fletcher', city:'paris' ,skills:'javascript, node js, spring-boot',},
    {name:'Thomson', city:'lyon', skills:'react, react native, django'},
    {name:'Rayane', city:'seattle', skills:'java, postgres, flutter'},
    {name:'Tamenou',city:'Douala',skills:'express js, node js'},
    {name:'Fryde',city:'Yaounde',skills:'PHP, laravel, Mysql'},
    {name:'Noah',city:'New delhi',skills:'Python, Django, Sqlite'}
]

  return (
    <div className='bg-slate-200'>
       <NavBar />
    <div className="text-3xl text-center bg-slate-200 h-screen flex justify-center items-center flex-wrap">
       
    <ul className="flex justify-center text-lg bg-white p-4 rounded shadow-lg flex-wrap gap-4">
        {users.map((user, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded shadow-md flex flex-col items-center justify-between w-64 ">

             <div className="flex flex-col rounded shadow-md items-center">
             <h2 className="text-xl font-bold">{user.name}</h2>
             <p className="text-gray-600">{user.city}</p>
             <p className="text-gray-500">{user.skills}</p>
             </div>

             <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer">Connect</button>
           
          </li>
        ))}
      </ul>
      
  </div>
    </div>
 
  )
}
