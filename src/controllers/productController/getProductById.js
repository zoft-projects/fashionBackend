const { productService } = require("../../services")

exports.getProductByid=async(req,res)=>{
    const {_id}=req.params 
    try{
        const productById=await productService.getProductById(_id)
        res.json({status:200,message:'Get product details by id',product:productById});
    }
    catch (error) {
        res.json({ status:400,message: 'Failed to retrieve product', error: error.message });
    }
}