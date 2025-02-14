const { adminServices } = require("../../services");
import { Request, Response } from "express";
import { userService } from "../../services";

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.params;
  
    try {
      const user = await userService.getUserById(_id);
      if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

      const newRole = user.role === "admin" ? "user" : "admin";
      const updatedUser = await adminServices.updateUser(_id, newRole);
      res.status(200).json({status: 200,message: "User updated successfully",updatedUser: updatedUser});
    } 
    catch (error: any) {
      res.status(400).json({status: 400,message: "Failed to update",error: error.message});
    }
  };
  