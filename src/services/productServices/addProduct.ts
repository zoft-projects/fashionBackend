import products from "../../database/models/products/products";
import { productSchemaType } from "../../types/model_type/product_model_type";

export const addProduct = async (productData: productSchemaType)
: Promise<any> => {
  try {
    const newProduct = new products(productData);
    await newProduct.save();
    return newProduct;
  } 
  catch (error) {
    throw error;
  }
};
