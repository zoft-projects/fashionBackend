import { Request, Response } from "express";
import { userService } from "../../services";

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const _id =  (req as any).payload?.uid;;
  try {
    const userById = await userService.getUserById(_id);
    res.json({ status: 200, message: "Get user details by ID", userById });
  } catch (error: any) {
    res.status(400).json({ status: 400, message: "Failed to retrieve user", error: error.message });
  }
};
