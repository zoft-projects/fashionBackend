const { productService } = require("../../services")

exports.updateProduct=async(req,res)=>{

    const {_id}=req.params 
    try{
        const { name, brand, image, category, description, rating, price } = req.body;
    
        let imageObject = null;
        if (image) {
          const imageBuffer = Buffer.from(image.data, "base64");
          imageObject = {
            fname: image.fname,
            type: image.type,
            data: imageBuffer
          };
        }

        const existingProduct = await productService.getProductById(_id);

        const updatedData = {
            name,
            brand,
            image: imageObject  || existingProduct.image,
            category,
            description,
            rating,
            price
          };
        
        const updatedProduct = await productService.updateProduct(_id, updatedData);       
        res.json({status:200,message:"Product updated successfully", product:updatedProduct})
    }
    catch(error){
        res.json({ status:400,message: 'Failed to update', error: error.message });       
    }
}