import products from "../../database/models/products/products";
import { productSchemaType } from "../../types/model_type/product_model_type";

export const updateProduct = async (id: string, data: Partial<productSchemaType>): Promise<any> => {
  try {
    const updatedProduct = await products.findByIdAndUpdate(id, data, { new: true });
    if (!updatedProduct) {
      throw new Error('Product not found or failed to update');
    }
    return updatedProduct;
  } 
  catch (error) {
    throw error;
  }
};
