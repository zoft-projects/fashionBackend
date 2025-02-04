const products = require("../../database/models/products/products")

exports.getProductById=async(id)=>{
    try{
        const productById=await products.findById(id)
        return productById
    }
    catch(error){
        throw error
    }
}