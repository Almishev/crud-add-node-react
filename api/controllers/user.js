import { db } from "../db.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  const { name, email, phone} = req.body;

  // Validate input data
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const q = "INSERT INTO users(name, email, phone) VALUES($1, $2, $3)";
    const values = [name, email, phone];

    await db.query(q, values);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { name, email, phone} = req.body;

  // Validate input data
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const q =
      "UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4";
    const values = [name, email, phone, req.params.id];

    const result = await db.query(q, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const q = "DELETE FROM users WHERE id = $1";
    const result = await db.query(q, [req.params.id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};
