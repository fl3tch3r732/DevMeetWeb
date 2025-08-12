import db from '../config/db.js';

export const createMessage = async (senderId, receiverId, content) => {
  const result = await db.query(
    `INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *`,
    [senderId, receiverId, content]
  );
  return result.rows[0];
};

export const getUserMessages = async (userId) => {
  const result = await db.query(
    `SELECT * FROM messages WHERE sender_id = $1 OR receiver_id = $1 ORDER BY sent_at ASC`,
    [userId]
  );
  return result.rows;
};

export const getConversation = async (req, res) => {
  const { userId, otherUserId } = req.params;

  try {
    // ✅ 1. Mark messages as read where:
    // sender is other user and receiver is current user
    await db.query(
      `UPDATE messages
       SET is_read = true
       WHERE sender_id = $1 AND receiver_id = $2 AND is_read = false`,
      [otherUserId, userId]
    );

    // ✅ 2. Fetch the conversation
    const result = await db.query(
      `SELECT *
       FROM messages
       WHERE
         (sender_id = $1 AND receiver_id = $2)
         OR
         (sender_id = $2 AND receiver_id = $1)
       ORDER BY created_at ASC`,
      [userId, otherUserId]
    );

    res.json({
      conversation: result.rows
    });

  } catch (err) {
    console.error('Error fetching conversation:', err);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
};

