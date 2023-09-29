import express from "express";
import bcrypt from "bcrypt";

const authRouter = express.Router();

import { queryAsync } from "./routerFactory";  

const getUserById = async (userId: number) => {
  const sql = `SELECT * FROM users WHERE user_id = ? LIMIT 1`;
  const results: any = await queryAsync(sql, [userId]);
  const user = results[0];
  
  if (!user) {
    return null;
  }

  return {
    id: user.user_id,
    email: user.email,
    hashedPassword: user.password_hash,
    role: user.role_name
  };
};


const getUserByEmail = async (email: string) => {
    const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
    const results: any = await queryAsync(sql, [email]);
    const user = results[0];
    
    if (!user) {
      return null;
    }
  
    return {
      id: user.user_id,
      email: user.email,
      hashedPassword: user.password_hash,
    };
  };
  
  authRouter.post("/register", async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = `
            INSERT INTO users (email, password_hash)
            VALUES (?, ?)
        `;
  
      await queryAsync(sql, [email, hashedPassword]);
  
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: { code: 500, message: "Something went wrong" } });
    }
  }); 
  
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ error: { code: 401, message: "No user with that email" } });
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: { code: 401, message: "Incorrect password" } });
    }
    
    req.session.userId = user.id;
    res.json({ message: "Logged in" });
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: "Something went wrong" } });
  }
});

authRouter.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: { code: 500, message: "Failed to logout." } });
    }
    res.json({ message: "Logged out" });
  });
});

export default authRouter;

