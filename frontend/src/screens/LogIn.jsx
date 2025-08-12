import React from 'react'
import { useState } from 'react'
import Partnership from '../assets/Partnership.png'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { data, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/useAuth'
import { toast } from 'react-toastify'; // Import toast for notifications

export default function LogIn() {

const Toast = toast; // Initialize toast for notifications
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const {login} = useAuth(); // Assuming you have a login function in your AuthContext  

 const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      // // Store JWT in localStorage
      // localStorage.setItem('token', token);
      // localStorage.setItem('user', JSON.stringify(user));

      if (!token) throw new Error('No token received from server');
      login({ token, user }); // Call login function from AuthContext
      
      navigate('/Home'); // redirect to protected route
      
      Toast.success('Login successful!'); // Show success notification
      console.log('Login successful!');
      console.log('Server response:', data);

      
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }

  };


return (
<div  className='flex flex-col'>
  <div className='flex flex-row p-5 pt-0 bg-gray-100 font-bold text-xl'>
    <nav className='flex flex-1 flex-row justify-between items-center p-10'>
      <h2>DevMeet</h2>
      <button className='flex justify-center items-center font-semibold bg-black text-white rounded-full border-gray-2 w-30 h-10 mt-3 cursor-pointer' onClick={()=>navigate('/signup')}>Sign Up</button>
    </nav>
  </div>
      
  <div  className="flex justify-center flex-row w-full bg-gray-100">

   <div  className='flex justify-center items-center flex-col w-[50%] h-full '>
      <form onSubmit={handleLogin}  className='flex justify-center items-center flex-col mt-[25%] ml-[30%]'>
        <h2 className='text-3xl font-semibold mb-10 text-gray-700'>Log In</h2>

        <input type="email" id="user-info"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         placeholder='Email'
         required
         className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
        />

        <input type="password" id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
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
      </form>
            <div className='flex gap-20 mt-8 ml-[30%]'>
              <button className='text-sm text-blue-500 cursor-pointer hover:underline' onClick={()=>navigate('/signup')}>Register now</button>
              <button className='text-sm text-gray-500 cursor-pointer'>Forgot password?</button>
            </div>
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
