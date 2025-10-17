import { createUserService, getAllUserService, getUserByIdUserService, deleteUserService, getUserByEmail, updateUserProfile } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import db from '../config/db.js';

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
}


export const signUp = async (req, res, next) => {
    const { name, email, location, skills, github, linkedIn, password } = req.body;
    // Validate input
    if (!name || !email || !location || !skills || !github || !linkedIn || !password) {
        return handleResponse(res, 400, "All fields are required");
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUserService(name, email, location, skills, github, linkedIn, hashedPassword);
        handleResponse(res, 201, "User created successfully", newUser);
    } catch (err) {
        next(err);
    }
}

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return handleResponse(res, 400, "All fields are required");
  }

  try {
    // Get user by email (not email & password)
    const user = await getUserByEmail(email);

    if (!user) {
      return handleResponse(res, 401, "Incorrect email or password");
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return handleResponse(res, 401, "Incorrect email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET, // secret key
      { expiresIn: '2h' }
    );

    //Return token + user info (not password)
    const { password: _, ...userInfo } = user;

    return res.status(200).json({
      message: 'Login successful',
      token, // This is what the frontend needs
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        location:user.location,
        skills:user.skills,
        linkedIn:user.linkedin,
        github:user.github,
        image:user.image,

      },
    });

  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
   
    try {
        const users = await getAllUserService();
         if (users.length === 0) {
            return handleResponse(res, 404, "No users found");
        }
        handleResponse(res, 200, "Users fetched successfully", users);
       
    } catch (err) {
        next(err);
    }
     
}

export const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const { userId, name, location, skills, linkedIn, github } = req.body;
    const profile_image = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await db.query(
      `UPDATE users SET 
        name = $1, 
        location = $2, 
        skills = $3, 
        linkedIn = $4, 
        github = $5,
        profile_image = COALESCE($6, profile_image)
       WHERE id = $7 RETURNING *`,
      [name, location, skills, linkedIn, github, profile_image, userId]
    );

   res.status(200).json({
  message: 'Profile updated',
  user: result.rows[0],
  imageUrl: result.rows[0].profile_image, // ✅ this line is critical
});


  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ status: 500, error: 'Something went wrong', message: error.message });
  }
};

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUserService(id);
        if (!deletedUser) {
            return handleResponse(res, 404, "User not found");
        }
        handleResponse(res, 200, "User deleted successfully", deletedUser);
    } catch (err) {
        next(err);
    }
}