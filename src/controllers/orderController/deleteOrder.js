const { orderServices } = require("../../services")

exports.deleteOrder=async(req,res)=>{
    const {_id}=req.params 
    try{
        const deletedOrder=await orderServices.deleteOrder(_id)
        res.json({status:200,message:"Order deleted successfully",deletedOrder:deletedOrder})
    }
    catch(error){
        res.json({status:400,message:"Failed to delete order",error:error.message})
    }

}