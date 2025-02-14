import { Request, Response } from "express";
import { validationResult, body } from "express-validator";
import bcrypt from "bcrypt";
import { userService } from "../../services";
import users from "../../database/models/users/users";

export const validateRegister = [
  body("username").trim().notEmpty().withMessage("Username is required")
    .matches(/^[a-zA-Z ]+$/).withMessage("Username must contain only letters and spaces"),
  body("email").notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required")
    .matches(/^[a-zA-Z0-9 ]+$/).withMessage("Password must contain only letters, numbers, and spaces"),
];

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ status: 400, errors: errors.array() });
    return;
  }

  const { password, ...data } = req.body;

  try {
    const existingUser = await users.findOne({ email: data.email });
    if (existingUser) {
      res.status(400).json({ status: 400, message: "User already exists" });
      return;
    }

    const hashPsw = await bcrypt.hash(password, 10);
    const newUser = await userService.registerUser({ ...data, password: hashPsw });

    
    res.status(201).json({ status: 201, message: "User created successfully", newUser: newUser });
  } 
  catch (error: any) {
    res.status(400).json({ status: 400, message: "Failed to add user", error: error.message });
  }
};
