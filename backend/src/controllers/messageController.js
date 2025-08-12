import { createMessage, getUserMessages, getConversation } from '../models/messageModel.js';
import db from '../config/db.js'

export const sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const message = await createMessage(senderId, receiverId, content);
    res.status(201).json({ message: 'Message sent', data: message });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getMessages = async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await getUserMessages(userId);
    res.status(200).json({ messages });
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to get messages' });
  }
};

export const getConversationBetweenUsers = async (req, res) => {
  const { userId, otherUserId } = req.params;

  try {
    const result = await db.query(`
      SELECT *
      FROM messages
      WHERE
        (sender_id = $1 AND receiver_id = $2)
        OR
        (sender_id = $2 AND receiver_id = $1)
      ORDER BY sent_at ASC
    `, [userId, otherUserId]);

    // Mark received messages as read:
    await db.query(`
      UPDATE messages
      SET is_read = true
      WHERE sender_id = $2 AND receiver_id = $1 AND is_read = false
    `, [userId, otherUserId]);

    res.json({ conversation: result.rows });
  } catch (err) {
    console.error('Error fetching conversation:', err);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
};


export const getConversations = async (req, res) => {
  const { userId } = req.params;

  const result = await db.query(
    `
    SELECT DISTINCT ON (LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id))
      id, sender_id, receiver_id, content, sent_at
    FROM messages
    WHERE sender_id = $1 OR receiver_id = $1
    ORDER BY LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id), sent_at DESC
    `,
    [userId]
  );

  // Get user info for each other user
  const conversations = await Promise.all(
    result.rows.map(async (msg) => {
      const otherUserId = msg.sender_id === parseInt(userId) ? msg.receiver_id : msg.sender_id;

      const user = await db.query(`SELECT id, name, profile_image FROM users WHERE id = $1`, [otherUserId]);

      return {
        ...msg,
        otherUser: user.rows[0],
      };
    })
  );

  res.json({ conversations });
};


  // try {
  //   const conversation = await getConversation(userId1, userId2);
  //   res.status(200).json({ conversation });
  // } catch (err) {
  //   console.error('Error fetching conversation:', err);
  //   res.status(500).json({ error: 'Failed to get conversation' });
  // }