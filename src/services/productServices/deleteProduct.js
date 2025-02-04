const products = require("../../database/models/products/products")

exports.deleteProduct=async(id)=>{
    try{
        const deletedProduct=await products.findOneAndDelete({_id:id})
        return deletedProduct
    }
    catch(error){
        throw error
    }
}