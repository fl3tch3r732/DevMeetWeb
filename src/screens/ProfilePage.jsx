import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: '',
    bio: '',
    city: '',
    skills: '',
    image: '',
  });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setPreview(storedUser.image || '');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setUser((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSave = () => {
    // You can send this `user` object to your backend for saving
    alert('Profile updated!');
    console.log(user);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-5xl flex flex-col md:flex-row gap-10">
        {/* Profile card */}
        <div className="w-full md:w-1/3 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
            {preview ? (
              <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-5xl text-gray-400 flex items-center justify-center h-full">👤</span>
            )}
          </div>
          <button className="mb-4 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-blue-300 transition cursor-pointer">
            <input type="file" accept="image/*" onChange={handleImageChange} className='cursor-pointer'/></button>
          
          <h2 className="text-xl font-bold mt-4">{user.name || 'Your Name'}</h2>
          <p className="text-gray-600">{user.city || 'City'}</p>
        </div>

        {/* Edit form */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="p-3 border rounded-md"
            />
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              placeholder="City"
              className="p-3 border rounded-md"
            />
            <input
              type="text"
              name="skills"
              value={user.skills}
              onChange={handleChange}
              placeholder="Skills (comma separated)"
              className="p-3 border rounded-md col-span-1 sm:col-span-2"
            />
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              placeholder="Short bio"
              className="p-3 border rounded-md col-span-1 sm:col-span-2"
              rows={3}
            />
          </div>
          <button
            onClick={handleSave}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
