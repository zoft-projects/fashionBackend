const products = require("../../database/models/products/products")

exports.getProductByCategory=async(category)=>{
    try{
        const allProducts=await products.find({category})
        return allProducts
    }
    catch(error){
        throw error
    }
}