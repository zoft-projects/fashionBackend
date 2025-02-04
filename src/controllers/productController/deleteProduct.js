const {  productService } = require("../../services")

exports.deleteProduct=async(req,res)=>{
    const {_id}=req.params 
    try{
        const deletedProduct=await productService.deleteProduct(_id)
        res.json({status:200,message:"Product deleted successfully",deletedProduct:deletedProduct})
    }
    catch(error){
        res.json({status:400,message:"Failed to delete product",error:error.message})
    }
}