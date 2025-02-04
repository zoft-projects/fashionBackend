const products = require("../../database/models/products/products")

exports.updateProduct=async(id,data)=>{
    try{
        const updatedProduct=await products.findOneAndUpdate({_id:id},data,{new:true})
        return updatedProduct
    }
    catch(error){
        throw error
    }
}


