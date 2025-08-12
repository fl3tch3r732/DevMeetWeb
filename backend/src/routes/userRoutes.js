import express from "express"
import { getAllUsers, getUserById, updateProfile, deleteUser, signUp, logIn } from "../controllers/userController.js"
import { requestConnection, respondToRequest, getMyRequests, getMyConnections, } from '../controllers/connectionController.js';
import { sendMessage, getMessages, getConversationBetweenUsers } from '../controllers/messageController.js';
import { getConversations } from "../controllers/messageController.js";
import { verifyToken } from "../middlewares/auth.js"
import validateUser from "../middlewares/inputValidator.js"
import multer from "multer"
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, file.originalname.replace(ext, uniqueName)); // save with original name
  }
});

const upload = multer({ storage });

router.post("/signup", validateUser, signUp)
router.post("/login", logIn)
router.get("/user", getAllUsers)
router.get("/user/:id", getUserById)
router.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.email}` });
});
router.put('/user/update-profile', upload.single('profile-image'), updateProfile);
router.delete("/user/:id", deleteUser)

// Connection Routes
router.post('/connection/send', requestConnection);
router.put('/connection/respond', respondToRequest);
router.get('/connection/pending/:userId', getMyRequests);
router.get('/connection/list/:userId', getMyConnections);

// in routes/messageRoutes.js




router.post('/messages/send', sendMessage);
router.get('/messages/:userId', getMessages);
router.get('/messages/conversation/:userId1/:userId2', getConversationBetweenUsers);
router.get('/messages/conversations/:userId', getConversations);






export default router;