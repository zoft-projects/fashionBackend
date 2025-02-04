const products = require("../../database/models/products/products");

exports.addProduct = async (productData) => {
  try {
    const newProduct = new products(productData);
    await newProduct.save();
    return newProduct;
  } 
  catch (error) {
    throw error;
  }
};
