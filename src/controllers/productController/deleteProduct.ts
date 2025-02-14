import { Request, Response } from "express";
import { productService } from "../../services";

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(_id);
    res.json({ status: 200, message: "Product deleted successfully", deletedProduct });
  } 
  catch (error: any) {
    res.status(400).json({ status: 400, message: "Failed to delete product", error: error.message });
  }
};
