import pool from "../config/db.js";
import bcrypt from "bcrypt";


export const getAllUserService = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}

export const getUserByIdUserService = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
        throw new Error("User not found");
    }
    return result.rows[0];
}

export const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

export const createUserService = async (name, email, location, skills, github, linkedIn, password) => {
    const result = await pool.query(
        "INSERT INTO users (name, email, location, skills, github, linkedIn, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [name, email, location, skills, github, linkedIn, password]
    );
    return result.rows[0];
}

export const updateUserProfile = async ({ userId, name, location, skills, github, linkedIn, profile_image }) => {
  const result = await pool.query(
    `UPDATE users
     SET name = $1,
         location = $2,
         skills = $3,
         github = $4,
         linkedin = $5,
         profile_image = COALESCE($6, profile_image)
     WHERE id = $7
     RETURNING id, name, location, skills, github, linkedin, profile_image;`,
    [name, location, skills, github, linkedIn, profile_image, userId]
  );

  return result.rows[0];
};

export const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
        throw new Error("User not found");
    }
    return result.rows[0];
}
