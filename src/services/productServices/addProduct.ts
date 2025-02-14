import products from "../../database/models/products/products";
import { productSchemaType } from "../../types/model_type/product_model_type";

export const addProduct = async (productData: productSchemaType)
: Promise<string> => {
  try {
    const newProduct = new products(productData);
    await newProduct.save();
    return `${newProduct.name} is added successfully`;
  } 
  catch (error) {
    throw error;
  }
};
