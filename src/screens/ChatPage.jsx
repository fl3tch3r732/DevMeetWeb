import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export default function ChatPage() {
  const { otherUserId } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  
  // Refs for socket and chat container
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Load current user
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('Please log in');
      navigate('/login');
      return;
    }
    try {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Socket connection and room joining
  useEffect(() => {
    if (!currentUser || !otherUserId) return;

    // Initialize socket connection
    socketRef.current = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
    });

    const socket = socketRef.current;

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
      
      // Join room after connection is established
      const roomId = getRoomId(currentUser.id, otherUserId);
      socket.emit('join_room', roomId);
      console.log(`Joining room: ${roomId}`);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnected(false);
    });

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      console.log('New message received:', data);
      setConversation((prev) => {
        // Prevent duplicate messages
        const exists = prev.some(msg => 
          msg.id === data.id || 
          (msg.content === data.content && 
           msg.senderId === data.senderId && 
           Math.abs(new Date(msg.created_at) - new Date(data.created_at)) < 1000)
        );
        if (exists) return prev;
        return [...prev, data];
      });
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('connect_error');
        socket.off('receive_message');
        socket.disconnect();
      }
    };
  }, [currentUser, otherUserId]);

  // Fetch conversation history
  useEffect(() => {
    if (!currentUser || !otherUserId) return;

    const fetchConversation = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `http://localhost:3000/api/messages/conversation/${currentUser.id}/${otherUserId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setConversation(data.conversation || []);
      } catch (err) {
        console.error('Error fetching conversation:', err);
        alert('Could not load chat history');
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [currentUser, otherUserId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  // Helper to create consistent room ID
  const getRoomId = (id1, id2) => {
    const numId1 = parseInt(id1);
    const numId2 = parseInt(id2);
    return numId1 < numId2 ? `chat-${numId1}-${numId2}` : `chat-${numId2}-${numId1}`;
  };

  const handleSend = async () => {
    if (!message.trim() || !socketRef.current || !connected) return;

    const msgData = {
      room: getRoomId(currentUser.id, otherUserId),
      senderId: currentUser.id,
      receiverId: parseInt(otherUserId),
      content: message.trim(),
      created_at: new Date().toISOString(),
    };

    // Clear input immediately
    setMessage('');

    try {
      // Store in database first
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/messages/send', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderId: msgData.senderId,
          receiverId: msgData.receiverId,
          content: msgData.content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const savedMessage = await response.json();
      
      // Use the message data returned from server (includes ID, proper timestamp)
      const messageToSend = {
        ...msgData,
        id: savedMessage.id || Date.now(),
        created_at: savedMessage.created_at || msgData.created_at,
      };

      // Emit to socket server
      socketRef.current.emit('send_message', messageToSend);

      // Add to local conversation (optimistic update)
      setConversation((prev) => [...prev, messageToSend]);

    } catch (err) {
      console.error('Failed to send message:', err);
      alert('Failed to send message. Please try again.');
      // Restore message in input if sending failed
      setMessage(msgData.content);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p>Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <div className="p-10 text-center">Please log in to chat.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20"> {/* Added mt-20 for navbar spacing */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chat</h1>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div 
        ref={chatContainerRef}
        className="bg-white shadow rounded-lg p-4 h-[500px] overflow-y-auto mb-4 border"
      >
        {conversation.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          conversation.map((msg, i) => {
            const isOwnMessage = msg.senderId === currentUser.id || msg.sender_id === currentUser.id;
            return (
              <div
                key={msg.id || i}
                className={`mb-3 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs lg:max-w-md ${
                    isOwnMessage
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                  <p className={`text-xs mt-1 ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={!connected}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || !connected}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </div>
      
      {!connected && (
        <p className="text-red-500 text-sm mt-2 text-center">
          Connection lost. Trying to reconnect...
        </p>
      )}
    </div>
  );
}