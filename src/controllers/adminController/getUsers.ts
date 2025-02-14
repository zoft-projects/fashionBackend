const { adminServices } = require("../../services")
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await adminServices.getUsers();
    res.status(200).json({status: 200,message: "Get User details",allUsers: allUsers,});
  } 
  catch (error: any) {
    res.status(400).json({status: 400,message: "Failed to retrieve users",error: error.message,});
  }
};
