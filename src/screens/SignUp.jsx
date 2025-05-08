import React from 'react'
import Partnership from '../assets/Partnership.png'
import Button from '../../components/Button'
import Footer from '../../components/Footer'

export default function SignUp() {
  return (
    <div className='flex flex-col'>
      <div className='flex p-10 bg-gray-100 font-bold text-xl'>
    <nav>
      <h2>DevMeet</h2>
    </nav>
  </div>
      <div  className="flex justify-center flex-row w-full bg-gray-100">
           
           <div className='flex justify-center items-center w-full h-full'>
               <img src={Partnership}
                alt='partnership'
                className='w-[70%] h-[70%]'
                />  
           </div>
       
             <div  className='flex justify-center items-center flex-col w-[50%] h-full '>
               <form action="log-in"  className='flex justify-center items-center flex-col mt-[10%] mr-[30%]'>
               <h2 className='text-3xl font-semibold mb-10 text-gray-700'>Sign Up</h2>
                 <input type="text" name="" id="user-info"
                 placeholder='Full name'
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                 <input type="email" name="" id="email"
                 placeholder='Email address'
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                 <input type="text" name="" id="location"
                 placeholder='City or Town'
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                 <input type="text" name="" id="skills"
                 placeholder='Skills (ex: Java, python, c#...)'
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                  <input type="text" name="" id="github-link"
                 placeholder='Your GitHub'
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                  <input type="text" name="" id="linkedin-link"
                 placeholder='Your Linked'
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                 <input type="password" name="" id="password" 
                 placeholder='New password'
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                 <input type="password" name="" id="password" 
                 placeholder='Confirm password'
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                 
                 <button type="submit" 
                 className=' p-2  bg-blue-400 rounded-sm top-2 w-96 text-white text-lg'
                 >Sign Up</button>
                 
                 <div className='flex gap-20 mt-5'>
                   <h2 className='text-sm text-gray-500'>Already have an account?</h2>
                   <a href="" className='text-sm text-blue-500'>Log in</a>
                 </div>
                
               </form>
       
               <h2 className='p-5 mr-50 text-lg font-semibold text-gray-500 italic'>- or -</h2>
       
               <div className='mr-[30%]'>
                 <Button  />
               </div>
             </div>
             
         </div>
         <Footer />
    </div>
      
  )
}
