import products from "../../database/models/products/products";

export const deleteProduct = async (id: string): Promise<any> => {
  try {
    const deletedProduct = await products.findByIdAndDelete(id);
    return deletedProduct;
  } 
  catch (error) {
    throw error;
  }
};
