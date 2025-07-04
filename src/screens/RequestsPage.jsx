import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function RequestsPage() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const Toast = toast;

  const handleRespond = async (requestId, action) => {
    try {
      const res = await fetch('http://localhost:3000/api/connection/respond', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requestId,
          status: action === 'accept' ? 'accepted' : 'rejected'
        })
      });

      const data = await res.json();
      console.log('Response updated:', data);

      if (res.ok) {
        setPendingRequests(prev => prev.filter(req => req.id !== requestId));
       // alert(`Request ${action}ed successfully!`);
        Toast.success(`Request ${action}ed successfully!`);
      } else {
        alert(data.message || 'Failed to respond to request');
      }
    } catch (err) {
      console.error('Error responding to request:', err);
      alert('Could not respond to request.');
    }
  };

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          alert('You must be logged in to view requests');
          return;
        }

        const userId = JSON.parse(storedUser).id;
        const res = await fetch(`http://localhost:3000/api/connection/pending/${userId}`);
        const data = await res.json();

        console.log('Pending requests:', data.requests);
        setPendingRequests(data.requests || []);
      } catch (err) {
        console.error('Error fetching requests:', err);
        alert('Failed to load connection requests');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  if (loading) {
    return (
      <div className="p-10 max-w-3xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading connection requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Connection Requests</h1>

      {pendingRequests.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
          <p className="text-gray-500">You don't have any incoming connection requests at the moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((req) => (
            <div key={req.id} className="bg-white shadow-md border border-gray-200 p-6 rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                  {req.requester_image ? (
                    <img
                      src={`http://localhost:3000${req.requester_image}`}
                      alt="Requester"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-blue-600 font-bold text-lg">
                      {req.requester_name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">{req.requester_name}</p>
                  <p className="text-sm text-gray-500">wants to connect with you</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleRespond(req.id, 'accept')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRespond(req.id, 'reject')}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
