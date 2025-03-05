import { Request, Response } from "express";
import { productService } from "../../services";

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, brand, image, category, description, rating, price } = req.body;
    const imageObject = {
      fname: image.fname,
      type: image.type,
      data: image.data, 
    };

    const productData = {
      name,
      brand,
      image: imageObject,
      category,
      description,
      rating,
      price,
    };

    const newProduct = await productService.addProduct(productData);
    res.status(201).json({ status: 201, message: "Product added successfully", product: newProduct });
  } 
  catch (error: any) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Failed to add product", error: error.message });
  }
};
