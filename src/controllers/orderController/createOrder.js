const io = require("../../../app");
const { orderServices } = require("../../services")

exports.createOrder=async(req,res)=>{
    try{
        const { products, paymentStatus,status, totalPrice, shippingAddress } = req.body;
        const user = req.payload.uid;
        const orderData={
            user,
            products,
            status: status || 'unpaid',
            paymentStatus,
            totalPrice,
            shippingAddress
        }
        const newOrder=await orderServices.createOrder(orderData)
        const orderResponse = {
          _id: newOrder._id,
          user: newOrder.user,
          products: newOrder.products,
          status: newOrder.status,
          paymentStatus: newOrder.paymentStatus,
          totalPrice: newOrder.totalPrice,
          shippingAddress: newOrder.shippingAddress,
          orderDate: newOrder.orderDate,
          createdAt: newOrder.createdAt,
          updatedAt: newOrder.updatedAt
        };
        const io = req.app.locals.io;
        // console.log("Socket.io instance:", req.app.locals.io);
        
        if (io && typeof io.emit === "function") {
            console.log('Emitting newOrder event');
            io.emit("newOrder", { message: "A new order has been created.", order: orderResponse });
          } 
          else {
            console.error("Socket.io instance is invalid.");
          }
         res.json({status:201, message: "Order created successfully", order: newOrder });
        
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
      }
}