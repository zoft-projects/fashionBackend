import { Request, Response } from "express";
import { adminServices } from "../../services";

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.params;

  try {
    const deleteUser = await adminServices.deleteUser(_id);
    res.status(200).json({status: 200,message: "User deleted successfully",deleteUser: deleteUser,});
  } 
  catch (error: any) {
    res.status(400).json({status: 400,message: "Failed to delete user",error: error.message,});
  }
};


