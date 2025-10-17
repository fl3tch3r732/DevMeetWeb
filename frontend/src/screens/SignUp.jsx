import Partnership from '../assets/Partnership.png'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SignUp() {

  const Toast = toast;

  const navigate = useNavigate();

    const [form, setForm] = useState({
    name: '',
    email: '',
    location: '',
    skills: '',
    github: '',
    linkedIn: '',
    password: '',
    confirmPassword: '',
  });

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

 
  if (form.password !== form.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        location: form.location,
        skills: form.skills,
        github: form.github,
        linkedIn: form.linkedIn,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Server response:', data);
      throw new Error(data.error || 'Signup failed');
    }

    console.log('User signed up:', data);
    Toast.success('Signup successful!');
    
    // Optionally, you can redirect the user to the login page or another page
    
    navigate('/login');
  0;
  } catch (err) {
    console.error('Signup error:', err.message);
    alert(err.message);
  }
};


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
               <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col mt-[10%] mr-[30%]'>
               <h2 className='text-3xl font-semibold mb-10 text-gray-700'>Sign Up</h2>
                 <input type="text" name="name" id="user-info"
                 placeholder='Full name'
                 onChange={handleChange}
                 value={form.name}
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                 <input type="email" name="email" id="email"
                 placeholder='Email address'
                  onChange={handleChange}
                  value={form.email}
                  required
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                 <input type="text" name="location" id="location"
                 placeholder='City or Town'
                  onChange={handleChange}
                  value={form.location}
                  required
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                 <input type="text" name="skills" id="skills"
                 placeholder='Skills (ex: Java, python, c#...)'
                  onChange={handleChange}
                  value={form.skills}
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                  <input type="text" name="github" id="github-link"
                 placeholder='Your GitHub'
                  onChange={handleChange}
                  value={form.github}
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                  <input type="text" name="linkedIn" id="linkedin-link"
                 placeholder='Your LinkedIn'
                  onChange={handleChange}
                  value={form.linkedIn}
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                 <input type="password" name="password" id="password" 
                 placeholder='New password'
                  onChange={handleChange}
                  value={form.password}
                  required
                 className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                 />
                  <input type="password" name="confirmPassword" id="confirm-password"
                  placeholder='Confirm password'
                  onChange={handleChange}
                  value={form.confirmPassword}
                  required
                  className=' p-4 mb-5 bg-gray-100 rounded-lg top-4 w-96 border-2 border-gray-200 '
                  />
                 
                 <button type="submit" 
                 className=' p-2  bg-blue-400 rounded-sm top-2 w-96 text-white text-lg cursor-pointer'
                 >Sign Up</button>
                 
                 <div className='flex gap-20 mt-5'>
                   <h2 className='text-sm text-gray-500'>Already have an account?</h2>
                   <button className='text-sm text-blue-500 cursor-pointer' onClick={()=>navigate('/login')}>Log in</button>
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
