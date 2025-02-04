const { orderServices } = require("../../services")

exports.getOrders=async(req,res)=>{
    try{
        const allOrders=await orderServices.getOrders()
        res.json({status:200,message:'Get order details',allOrders:allOrders});
    }
    catch(error){
        res.json({ status:400,message: 'Failed to retrieve orders', error: error.message });
    }    
}