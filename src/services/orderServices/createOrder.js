const orders = require("../../database/models/orders/order");

exports.createOrder=async(orderData)=>{
    try {
        const newOrder = new orders(orderData);
        await newOrder.save();
        return newOrder;
    } 
    catch (error) {
        throw error;
    }
}