import { Request, Response } from "express";
import { productService } from "../../services";
import { productSchemaType } from "../../types/model_type/product_model_type";

interface ImageObject {
  fname: string;
  type: string;
  data: string; 
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.params;
  try {
    const { name, brand, image, category, description, rating, price } = req.body;

    const existingProduct: productSchemaType | null = await productService.getProductById(_id);
    if (!existingProduct) {
      res.status(404).json({ status: 404, message: "Product not found" });
      return;
    }

    let imageObject: ImageObject | null = existingProduct.image;
    if (image?.data && image?.fname && image?.type) {
      imageObject = {
        fname: image.fname,
        type: image.type,
        data: image.data, 
      };
    }

    const updatedData = {
      name: name ?? existingProduct.name,
      brand: brand ?? existingProduct.brand,
      image: imageObject, 
      category: category ?? existingProduct.category,
      description: description ?? existingProduct.description,
      rating: rating ?? existingProduct.rating,
      price: price ?? existingProduct.price,
    };

    const updatedProduct = await productService.updateProduct(_id, updatedData);
    res.json({ status: 200, message: "Product updated successfully", product: updatedProduct });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Failed to update product", error: error.message });
  }
};

