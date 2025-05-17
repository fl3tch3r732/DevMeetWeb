import React from 'react'
import Partnership from '../assets/Partnership.png'
import Button from '../../components/Button'
import Footer from '../../components/Footer'

export default function LogIn() {
  return (
<div  className='flex flex-col'>
  <div className='flex flex-row p-10 bg-gray-100 font-bold text-xl'>
    <nav className='flex flex-1 flex-row justify-between items-center p-10'>
      <h2>DevMeet</h2>
      <button className='flex justify-center items-center font-semibold bg-black text-white rounded-full border-gray-2 w-30 h-10 mt-3 cursor-pointer'>Sign Up</button>
    </nav>
  </div>
      
  <div  className="flex justify-center flex-row w-full bg-gray-100">

   <div  className='flex justify-center items-center flex-col w-[50%] h-full '>
      <form action="log-in"  className='flex justify-center items-center flex-col mt-[25%] ml-[30%]'>
        <h2 className='text-3xl font-semibold mb-10 text-gray-700'>Log In</h2>
        <input type="text" name="" id="user-info"
         placeholder='Username or email'
         className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
        />
        <input type="password" name="" id="password" 
          placeholder='Password'
          className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
        />
        <div className='flex flex-row justify-between gap-10'>
           <div className='flex flex-row'>
             <input type="checkbox"
               name="remember-me"
               id="remember-me"
               className='mr-2'
             />
             <label htmlFor="remember-me" className='mt-2.5 mr-10 text-gray-500 text-sm'>Remember me</label>
           </div>
             <button type="submit" 
               className='ml-10 p-2  bg-blue-400 rounded-sm top-2 w-20 text-white cursor-pointer'>
               LOGIN
             </button>
        </div>

            <div className='flex gap-20 mt-8'>
              <a href="#home" className='text-sm text-blue-500'>Register now</a>
              <a href="" className='text-sm text-gray-500'>Forgot passsword?</a>
            </div>
   
      </form>

      <h2 className='p-5 ml-50 text-lg font-semibold text-gray-500 italic'>- or -</h2>

     <div className='ml-[30%]'>
       <Button  />
      </div>
   </div>

     <div className='flex justify-center items-center w-full h-full'>
      <img src={Partnership}
      alt='partnership'
      className='w-[70%] h-[70%]'
      />  
     </div>

  </div>
<Footer />
</div>
    
  )
}
