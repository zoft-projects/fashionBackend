import products from "../../database/models/products/products";
import { productSchemaType } from "../../types/model_type/product_model_type";

export const getProductById = async (id: string): Promise<productSchemaType | null> => {
  try {
    const productById = await products.findById(id);  
    return productById as productSchemaType | null;      
  } 
  catch (error) {
    throw error;
  }
};
