import React, { useState } from 'react';

export default function SignUp2() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bio, setBio] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Bio:', bio);
    console.log('Profile Photo:', profilePhoto);
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center mt-10">Profile photo and Bio</h1>
        <p className="text-center text-gray-600 mt-4">Please fill in your details to complete the sign-up process.</p>
      </div>
      
      <div>
        <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit}>
          {/* Profile Photo Preview */}
          <div className="mb-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100 flex items-center justify-center mb-4 shadow-lg">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <svg
                    className="w-12 h-12 mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-medium">Avatar</span>
                </div>
              )}
            </div>
            
            <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <input
              type="file"
              id="profilePhoto"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
          >
            Complete Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}