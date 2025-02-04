const orders = require("../../database/models/orders/order");

exports.getOrders=async()=>{
    try {
        const allOrders = await orders.find().populate('products.product');
        return allOrders;
    } 
    catch (error) {
        throw error;
    }
}