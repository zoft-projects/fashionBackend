import products from "../../database/models/products/products";
import { productSchemaType } from "../../types/model_type/product_model_type";


export const getAllProducts = async (): Promise<productSchemaType[]> => {
  try {
    const allProducts = await products.find();
    return allProducts as productSchemaType[]; 
  } 
  catch (error) {
    throw error;
  }
};

