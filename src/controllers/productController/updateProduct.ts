import { Request, Response } from "express";
import { productService } from "../../services";
import { productSchemaType } from "../../types/model_type/product_model_type";

interface ImageObject {
  fname: string;
  type: string;
  data: Buffer;
}

export const updateProduct = async (req: Request, res: Response): Promise<any> => {
  const { _id } = req.params;
  try {
    const { name, brand, image, category, description, rating, price } = req.body;

    let imageObject: ImageObject | null = null;
    
    if (image && image.data && image.fname && image.type) {
      const imageBuffer = Buffer.from(image.data, "base64");
      imageObject = {
        fname: image.fname,
        type: image.type,
        data: imageBuffer,
      };
    }

    const existingProduct: productSchemaType | null = await productService.getProductById(_id);

    if (!existingProduct) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }
    const updatedData = {
      name: name || existingProduct.name,
      brand: brand || existingProduct.brand,
      image: imageObject || existingProduct.image,
      category: category || existingProduct.category,
      description: description || existingProduct.description,
      rating: rating || existingProduct.rating,
      price: price || existingProduct.price,
    };

    const updatedProduct = await productService.updateProduct(_id, updatedData);
    res.json({ status: 200, message: "Product updated successfully", product: updatedProduct });
  } 
  catch (error: any) {
    res.status(400).json({ status: 400, message: "Failed to update product", error: error.message });
  }
};
