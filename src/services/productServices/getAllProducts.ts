import products from "../../database/models/products/products";
import { productSchemaType } from "../../types/model_type/product_model_type";

export const getAllProducts = async (category?: string): Promise<productSchemaType[]> => {
  try {
    const filter = category ? { category } : {};
    const allProducts = await products.find(filter);
    return allProducts as productSchemaType[]; 
  } 
  catch (error) {
    throw error;
  }
};
