import { Request, Response } from "express";
import { userService } from "../../services";

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.params;
  const { base64Image, fileName, fileType } = req.body;

  try {
    const updatedUser = await userService.updateProfile(_id, base64Image, fileName, fileType);
    res.json({ status: 200, message: "Profile updated successfully", updatedUser });
  } 
  catch (error: any) {
    res.status(400).json({ status: 400, message: "Failed to update profile", error: error.message });
  }
};
