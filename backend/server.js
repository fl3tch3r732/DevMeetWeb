import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js"; 
import errorHandling from "./src/middlewares/errorHandler.js";
import createUserTable from "./src/data/createUserTable.js";
import { createConnectionsTable } from "./src/data/createUserTable.js";
import { createMessagesTable } from "./src/data/createUserTable.js";
import path from "path";
import { fileURLToPath } from 'url';
import { createServer } from "http";
import { Server } from "socket.io";
import http from "http";


dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173', // allow your frontend URL
    methods: ['GET', 'POST'],
  },
});

// ✅ Socket.io events
io.on('connection', (socket) => {
  console.log(`⚡ New client connected: ${socket.id}`);

  // Join room for private chat
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  // Handle send_message event
  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    io.to(data.room).emit('receive_message', data); // broadcast to room
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });

  socket.on('message', async (msg) => {
  // Save to DB!
  await db.query(
    `INSERT INTO messages (sender_id, receiver_id, content)
     VALUES ($1, $2, $3)`,
    [msg.senderId, msg.receiverId, msg.content]
  );

  io.to(msg.receiverId).emit('message', msg);
});

});

app.use('/uploads', express.static('uploads'));
const __dirname = fileURLToPath(import.meta.url);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



app.use("/api", userRoutes);


//error handling
app.use(errorHandling)

//create tables
createUserTable();
createConnectionsTable();
createMessagesTable();

//server running
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});


//db testing
app.get("/", async(req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is ${result.rows[0].current_database}`);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

