import { Request, Response } from "express";
import { productService } from "../../services";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    
      const allProducts = await productService.getAllProducts();
      res.json({ status: 200, message: "Get product details", allProducts });
  } 
  catch (error: any) {
    res.status(400).json({ status: 400, message: "Failed to retrieve products", error: error.message });
  }
};
