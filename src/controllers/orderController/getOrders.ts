import { Request, Response } from "express";
import { orderServices } from "../../services";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const allOrders = await orderServices.getOrders();
    res.status(200).json({status: 200,message: "Get order details",allOrders: allOrders});
  } 
  catch (error: any) {
    res.status(400).json({status: 400,message: "Failed to retrieve orders",error: error.message});
  }
};
