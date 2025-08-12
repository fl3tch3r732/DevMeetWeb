import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function PublicProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

//   const [currentUser, setCurrentUser] = useState(null);
 

//     useEffect(() => {
//       // Get current user
//       const storedUser = JSON.parse(localStorage.getItem('user'));
//       if (storedUser) setCurrentUser(storedUser);
  
//       // Fetch all users
//       fetch('http://localhost:3000/api/user')
//         .then((res) => res.json())
//         .then((data) => {
//           console.log('Fetched users:', data);
//         })
//         .catch((err) => console.error('Error:', err));
//     }, []);

//     const sendConnectionRequest = async (receiverId) => {
//     if (!currentUser?.id) return alert('You must be logged in to connect.');

//     try {
//       const res = await fetch('http://localhost:3000/api/connection/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           senderId: currentUser.id,
//           receiverId: receiverId,
//         }),
//       });

//       const data = await res.json();
//       console.log('Connection request sent:', data);
//       alert('Connection request sent!');
//     } catch (err) {
//       console.error('Failed to send request:', err);
//       alert('Could not send request.');
//     }
//   };

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched single user:", data);
        console.log("LinkedIn field:", data.user?.linkedIn);
        console.log("All user fields:", Object.keys(data.user || {}));
        setUser(data.user);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
      });
  }, [id]);

  if (!user) return <p className="text-center mt-20 text-lg text-gray-500">Loading profile...</p>;

  // Try different possible field names for LinkedIn
  const linkedInUrl = user.linkedIn || user.linkedin || user.linkedin_url || user.linkedinUrl;
  const githubUrl = user.github || user.github_url || user.githubUrl;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
        {/* Left - Profile Image */}
        <div className="md:w-1/3 bg-blue-100 flex items-center justify-center p-6">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
            {user.profile_image ? (
              <img
                src={`http://localhost:3000${user.profile_image}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-blue-600 bg-white">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Right - Info */}
        <div className="md:w-2/3 p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{user.name}</h2>
          <p className="text-gray-600 text-sm mb-4 italic">{user.location || 'Location not provided'}</p>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills?.split(',').map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Links</h3>
            <div className="flex gap-4">
              {linkedInUrl && (
                <a
                  href={linkedInUrl.startsWith('http') ? linkedInUrl : `https://${linkedInUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:underline"
                >
                  LinkedIn
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl.startsWith('http') ? githubUrl : `https://${githubUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:underline"
                >
                  GitHub
                </a>
              )}
              {!linkedInUrl && !githubUrl && (
                <p className="text-gray-400 italic">No social links provided.</p>
              )}
            </div>
          </div>


           <Link to={`/chat/${user.id}`}>
           <button  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Discuss
          </button>
           </Link>

          
        </div>
      </div>
    </div>
  );
}