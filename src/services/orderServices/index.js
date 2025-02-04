const { createOrder } = require("./createOrder");
const { deleteOrder } = require("./deleteOrder");
const { getOrders } = require("./getOrder");
const { getOrderById } = require("./getOrderById");
const { updateOrder } = require("./updateOrder");

module.exports={
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
}