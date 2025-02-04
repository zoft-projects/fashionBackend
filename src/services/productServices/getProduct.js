const products = require("../../database/models/products/products")

exports.getAllProducts=async()=>{
    try{
        const allProducts=await products.find()
        return allProducts
    }
    catch(error){
        throw error
    }
}