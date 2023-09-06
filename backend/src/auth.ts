import express from "express";
import bcrypt from "bcrypt";

const authRouter = express.Router();

import { queryAsync } from "./routerFactory";  

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
  
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ message: "No user with that email" });
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    
    req.session.userId = user.id;
    res.json({ message: "Logged in" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

authRouter.get("/me", (req, res) => {
  const userId = req.session.userId;
  const isLoggedIn = userId !== undefined;
  res.json({
    isLoggedIn: isLoggedIn,
    userId: userId,
  });
});

export default authRouter;
