import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Connections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const navigate = useNavigate();


useEffect(() => {
  const fetchConnections = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert('You must be logged in to view connections');
        setLoading(false);
        return;
      }

      const userId = JSON.parse(storedUser).id;
      const res = await fetch(`http://localhost:3000/api/connection/list/${userId}`);
      const data = await res.json();

      console.log('Fetched connections:', data);
      // ✅ Make sure you match backend: is it { connections: [...] } ?
      setConnections(data.connections || []);
    } catch (err) {
      console.error('Error fetching connections:', err);
      alert('Failed to load connections');
    } finally {
      setLoading(false);
    }
  };

  fetchConnections();
}, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your connections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">My Connections</h1>
        
        {connections.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {connections.map((connection) => (
              <div 
                key={connection.id} 
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                {/* Profile Image/Avatar */}
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mb-3 flex items-center justify-center">
                    {connection.profile_image ? (
                      <img
                        src={`http://localhost:3000${connection.profile_image}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-blue-600 font-bold text-xl">
                        {connection.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 text-center">
                    {connection.name}
                  </h2>
                </div>

                {/* Connection Details */}
                <div className="space-y-2">
                  {connection.email && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      <span className="text-sm">{connection.email}</span>
                    </div>
                  )}
                  
                  {connection.location && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm">{connection.location}</span>
                    </div>
                  )}

                  {connection.skills && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {connection.skills.split(',').slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                        {connection.skills.split(',').length > 3 && (
                          <span className="text-xs text-gray-500 px-2 py-1">
                            +{connection.skills.split(',').length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link to={`/publicprofile/${connection.user_id}`} className="block">
                  <button 
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    View Profile
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No connections yet</h3>
            <p className="text-gray-500 mb-6">Start connecting with other developers to build your network!</p>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              onClick={() => navigate('/Home')} 
            >
              Discover Developers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}