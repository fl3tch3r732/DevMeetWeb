import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

export default function Homescreen() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredSkill, setFilteredSkill] = useState('');
  const [filteredLocation, setFilteredLocation] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/user')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        console.log('Fetched users:', data);
      })
      .catch((err) => console.error('Error:', err));
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchName = user.name?.toLowerCase().includes(search.toLowerCase());
    const matchSkill = filteredSkill ? user.skills?.toLowerCase().includes(filteredSkill.toLowerCase()) : true;
    const matchCity = filteredLocation ? user.location?.toLowerCase().includes(filteredLocation.toLowerCase()) : true;
    return matchName && matchSkill && matchCity;
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
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center transition duration-300 hover:shadow-2xl hover:scale-[1.03]"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mb-4">
                {user.name?.charAt(0).toUpperCase()}
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

              <button className="mt-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition">
                Connect
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
