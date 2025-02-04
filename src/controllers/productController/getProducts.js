const { productService } = require("../../services")

exports.getAllProducts=async(req,res)=>{
    const {category}=req.query
    try{
        let allProducts;
        if (category) {
          allProducts = await productService.getProductByCategory(category);
        } 
        else {
          allProducts = await productService.getAllProducts();
        }
        res.json({status:200,message:'Get product details',allProducts:allProducts});
    }
    catch (error) {
        res.json({ status:400,message: 'Failed to retrieve products', error: error.message });
    }
}