import db from '../config/db.js';

export const sendConnectionRequest = async (senderId, receiverId) => {
  // Check if a request already exists
  const check = await db.query(
    `SELECT * FROM connections 
     WHERE requester_id = $1 AND receiver_id = $2`,
    [senderId, receiverId]
  );

  if (check.rows.length > 0) {
    throw new Error('Connection request already exists');
  }

  // Insert new request if none exists
  const result = await db.query(
    `INSERT INTO connections (requester_id, receiver_id)
     VALUES ($1, $2) RETURNING *`,
    [senderId, receiverId]
  );

  return result.rows[0];
};


export const updateConnectionStatus = async (requestId, status) => {
  const result = await db.query(
    `UPDATE connections SET status = $1 WHERE id = $2 RETURNING *`,
    [status, requestId]
  );
  return result.rows[0];
};

export const getPendingRequests = async (userId) => {
  const result = await db.query(
     `SELECT 
       c.id, 
       c.requester_id, 
       u.name AS requester_name, 
       u.profile_image AS requester_image
     FROM connections c
     JOIN users u ON c.requester_id = u.id
     WHERE c.receiver_id = $1 AND c.status = 'pending'`,
    [userId]
  );
  return result.rows;
};

export const getConnections = async (userId) => {
  const result = await db.query(
    `SELECT 
      c.id,
      c.status,
      c.created_at,
      u.id AS user_id,
      u.name,
      u.profile_image,
      u.location,
      u.skills,
      u.email
    FROM 
      connections c
    JOIN 
      users u 
      ON (u.id = CASE 
                   WHEN c.requester_id = $1 THEN c.receiver_id 
                   ELSE c.requester_id 
                 END)
    WHERE 
      (c.requester_id = $1 OR c.receiver_id = $1) AND c.status = 'accepted';`,
    [userId]
  );
  return result.rows;
};

