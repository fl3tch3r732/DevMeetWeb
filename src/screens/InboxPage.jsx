import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function InboxPage() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const userId = JSON.parse(storedUser).id;

    fetch(`http://localhost:3000/api/messages/conversations/${userId}`)
      .then(res => res.json())
      .then(data => {
        setConversations(data.conversations || []);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Inbox</h1>

      {conversations.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <div className="space-y-4">
          {conversations.map(conv => (
            <Link
              key={conv.id}
              to={`/chat/${conv.otherUser.id}`}
              className="block p-4 bg-white shadow rounded-md hover:shadow-md transition relative"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  {conv.otherUser.profile_image ? (
                    <img
                      src={`http://localhost:3000${conv.otherUser.profile_image}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-blue-600 font-bold text-xl flex items-center justify-center h-full">
                      {conv.otherUser.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold">{conv.otherUser.name}</p>
                  <p className="text-sm text-gray-600 truncate">{conv.content}</p>
                  <p className="text-xs text-gray-400">{new Date(conv.created_at).toLocaleString()}</p>
                </div>

                {/* ✅ Unread badge */}
                {conv.unread_count > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {conv.unread_count}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
