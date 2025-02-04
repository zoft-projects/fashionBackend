const orders = require("../../database/models/orders/order");

exports.getOrderById=async(id)=>{
    try {
        const orderById = await orders.find({ user: id }).populate('user').populate('products.product');;
        return orderById;
    } 
    catch (error) {
        throw error;
    }
}