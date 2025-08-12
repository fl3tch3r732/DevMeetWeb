import {
  sendConnectionRequest,
  updateConnectionStatus,
  getPendingRequests,
  getConnections,
} from '../models/connectionModel.js';

export const requestConnection = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const connection = await sendConnectionRequest(senderId, receiverId);
    res.status(201).json({ message: 'Request sent', connection });
  } catch (err) {
    if (err.message === 'Connection request already exists') {
      return res.status(400).json({ error: err.message });
    }
    console.error('Error sending request:', err);
    res.status(500).json({ error: 'Failed to send connection request' });
  }
};


export const respondToRequest = async (req, res) => {
  const { requestId, status } = req.body; // status: accepted or rejected

  try {
    const updated = await updateConnectionStatus(requestId, status);
    res.status(200).json({ message: 'Status updated', updated });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

export const getMyRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await getPendingRequests(userId);
    res.status(200).json({ requests });
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

export const getMyConnections = async (req, res) => {
  const { userId } = req.params;

  try {
    const connections = await getConnections(userId);
    res.status(200).json({ connections });
  } catch (err) {
    console.error('Error fetching connections:', err);
    res.status(500).json({ error: 'Failed to fetch connections' });
  }
};
// This code handles connection requests between users, allowing them to send, accept, or reject connection requests.