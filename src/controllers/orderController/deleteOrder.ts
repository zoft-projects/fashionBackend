import { Request, Response } from "express";
import { orderServices } from "../../services";

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.params;
  try {
    const deletedOrder = await orderServices.deleteOrder(_id);
    res.status(200).json({status: 200,message: "Order deleted successfully",deletedOrder: deletedOrder});
  } 
  catch (error: any) {
    res.status(400).json({status: 400,message: "Failed to delete order",error: error.message});
  }
};
