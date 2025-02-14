import { Request, Response } from "express";
import { orderServices } from "../../services";

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await orderServices.updateOrder(_id, status);
    res.status(200).json({message: "Order status updated",order: updatedOrder});
  } 
  catch (error: any) {
    console.error(error);
    res.status(500).json({message: "Failed to update order status",error: error.message});
  }
};
