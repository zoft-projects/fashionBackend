import { Request, Response } from "express";
import { orderServices } from "../../services";

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.params;
  try {
    const orderById = await orderServices.getOrderById(_id);
    res.status(200).json({status: 200,message: "Get order details",orderById: orderById});
  } 
  catch (error: any) {
    res.status(400).json({status: 400,message: "Failed to retrieve order",error: error.message});
  }
};
