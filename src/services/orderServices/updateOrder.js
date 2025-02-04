const orders = require("../../database/models/orders/order");

exports.updateOrder=async(id,status)=>{
    try {
        const updatedOrder = await orders.findByIdAndUpdate({_id:id}, { status }, { new: true });
        return updatedOrder;
    } 
    catch (error) {
        throw error;
    }
}