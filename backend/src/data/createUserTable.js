import pool from "../config/db.js";

const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            location VARCHAR(100),
            skills TEXT,
            github VARCHAR(255),
            linkedIn VARCHAR(255),
            password TEXT NOT NULL,
            profile_image TEXT,
            bio TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    try {
        await pool.query(query);
        console.log("User table created successfully!");
    } catch (error) {
        console.error("Error creating user table:", error);
    }
}
export default createUserTable;

export const createMessagesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            sender_id INTEGER REFERENCES users(id),
            receiver_id INTEGER REFERENCES users(id),
            content TEXT NOT NULL,
            is_read BOOLEAN DEFAULT FALSE,
            sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    try {
        await pool.query(query);
        console.log("Messages table created successfully!");
    } catch (error) {
        console.error("Error creating messages table:", error);
    }
}

export const createConnectionsTable = async () => {
    const query = `
       CREATE TABLE IF NOT EXISTS connections (
         id SERIAL PRIMARY KEY,
         requester_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
         receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
         status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

    `;
    try {
        await pool.query(query);
        console.log("Connections table created successfully!");
    } catch (error) {
        console.error("Error creating connections table:", error);
    }
}