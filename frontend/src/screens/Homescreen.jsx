import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Homescreen() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredSkill, setFilteredSkill] = useState('');
  const [filteredLocation, setFilteredLocation] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [connections, setConnections] = useState([]);
  const Toast = toast;

  useEffect(() => {
    // Get current user
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setCurrentUser(storedUser);

    // Fetch all users
    fetch('http://localhost:3000/api/user')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        console.log('Fetched users:', data);
      })
      .catch((err) => console.error('Error:', err));
  }, []);

  useEffect(() => {
    const fetchConnections = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      
      const userId = JSON.parse(storedUser).id;

      try {
        const res = await fetch(`http://localhost:3000/api/connection/list/${userId}`);
        const data = await res.json();
        setConnections(data.connections);
        console.log('Fetched connections:', data.connections);
      } catch (err) {
        console.error('Error fetching connections:', err);
      }
    };

    fetchConnections();
  }, []);

  const hasPendingRequest = (receiverId) => {
    if (!currentUser?.id) return false;
    
    return connections.some(
      conn =>
        (conn.requester_id === currentUser.id && conn.receiver_id === receiverId && conn.status === 'pending') ||
        (conn.receiver_id === currentUser.id && conn.requester_id === receiverId && conn.status === 'pending')
    );
  };

  const sendConnectionRequest = async (receiverId) => {
    if (!currentUser?.id) return alert('You must be logged in to connect.');

    try {
      const res = await fetch('http://localhost:3000/api/connection/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: currentUser.id,
          receiverId: receiverId,
        }),
      });

      const data = await res.json();
      console.log('Connection request sent:', data);
      Toast.success('Connection request sent!');
      
      // Refresh connections after sending request
      const updatedRes = await fetch(`http://localhost:3000/api/connection/list/${currentUser.id}`);
      const updatedData = await updatedRes.json();
      setConnections(updatedData.connections);
    } catch (err) {
      console.error('Failed to send request:', err);
      alert('Could not send request.');
    }
  };

  const filteredUsers = users.filter((user) => {
    // Filter out the current user first
    if (currentUser && user.id === currentUser.id) return false;
    
    const matchName = user.name?.toLowerCase().includes(search.toLowerCase());
    const matchSkill = filteredSkill ? user.skills?.toLowerCase().includes(filteredSkill.toLowerCase()) : true;
    const matchLocation = filteredLocation ? user.location?.toLowerCase().includes(filteredLocation.toLowerCase()) : true;
    return matchName && matchSkill && matchLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br pt-25 from-slate-100 to-slate-200">
      <NavBar />

      <header className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-gray-800">Connect with Developers</h1>
        <p className="mt-4 text-lg text-gray-600">
          Find talent, share ideas, and grow together.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 pb-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="p-3 border border-gray-300 rounded-md shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by skill (e.g. React)"
            className="p-3 border border-gray-300 rounded-md shadow-sm"
            value={filteredSkill}
            onChange={(e) => setFilteredSkill(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by city"
            className="p-3 border border-gray-300 rounded-md shadow-sm"
            value={filteredLocation}
            onChange={(e) => setFilteredLocation(e.target.value)}
          />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredUsers.map((user, index) => (
            <div className="w-full" key={user.id || index}>
              <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center transition duration-300 hover:shadow-2xl hover:scale-[1.03]">
                <Link to={`/profile/${user.id}`} className="block w-full flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mb-4 flex items-center justify-center">
                    {user.profile_image ? (
                      <img
                        src={`http://localhost:3000${user.profile_image}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-blue-600 font-bold text-xl">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
                  <p className="text-sm text-gray-500 mb-1">{user.location}</p>
                  <div className="flex flex-wrap justify-center gap-1 mt-2 mb-4">
                    {user.skills?.split(',').map((skill, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </Link>
                
                <button
                  disabled={hasPendingRequest(user.id)}
                  className={`mt-auto px-5 py-2 rounded-full transition cursor-pointer ${
                    hasPendingRequest(user.id)
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!hasPendingRequest(user.id)) {
                      sendConnectionRequest(user.id);
                    }
                  }}
                >
                  {hasPendingRequest(user.id) ? 'Pending' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}