const { orderServices } = require("../../services");

exports.updateOrder=async(req,res)=>{
    const {_id}=req.params 
    const {status}=req.body
    try {
        const updatedOrder = await orderServices.updateOrder(_id, status);
        res.status(200).json({ message: "Order status updated", order: updatedOrder });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update order status", error: error.message });
    }
}