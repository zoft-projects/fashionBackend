const { orderServices } = require("../../services")

exports.getOrderById=async(req,res)=>{
    const {_id}=req.params 
    try{
        const orderById=await orderServices.getOrderById(_id)
        res.json({status:200,message:'Get order details',orderById:orderById});
    }
    catch(error){
        res.json({ status:400,message: 'Failed to retrieve order', error: error.message });
    }    
 
    
}