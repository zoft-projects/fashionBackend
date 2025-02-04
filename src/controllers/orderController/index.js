const { createOrder } = require("./createOrder");
const { deleteOrder } = require("./deleteOrder");
const { getOrderById } = require("./getOrderById");
const { getOrders } = require("./getOrders");
const { updateOrder } = require("./updateOrder");

module.exports={
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
}