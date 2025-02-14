import { Request, Response } from "express";
import { productService } from "../../services";

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.params;
  try {
    const productById = await productService.getProductById(_id);
    res.json({ status: 200, message: "Get product details by id", product: productById });
  } 
  catch (error: any) {
    res.status(400).json({ status: 400, message: "Failed to retrieve product", error: error.message });
  }
};
