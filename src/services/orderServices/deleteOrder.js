const orders = require("../../database/models/orders/order")

exports.deleteOrder=async(id)=>{
    try{
        const deletedOrder=await orders.findByIdAndDelete({_id:id})
        return deletedOrder
    }
    catch(error){
        throw error
    }
}