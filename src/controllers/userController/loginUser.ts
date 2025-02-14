import { Request, Response } from "express";
import { userService } from "../../services";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response): Promise<void> => { 
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const user = await userService.loginUser(email, password);
    if (user) {
      const tokenPayload = {
        uid: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(tokenPayload, process.env.SECRET_KEY as string, { expiresIn: "1h" });
      res.json({ status: 200, message: "Login success", token, user });
    } 
    else {
      res.status(401).json({ status: 401, message: "Invalid credentials" });
    }
  } 
  catch (error: any) {
    res.status(400).json({ status: 400, message: "Failed to login", error: error.message });
  }
};
