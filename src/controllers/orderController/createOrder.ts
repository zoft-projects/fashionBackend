import { Request, Response } from "express";
import { orderServices } from "../../services";

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { products, paymentStatus, status, totalPrice, shippingAddress } = req.body;
    const user =  (req as any).payload?.uid;;
    const orderData = {
      user,
      products,
      status: status || "unpaid",
      paymentStatus,
      totalPrice,
      shippingAddress,
    };

    const newOrder = await orderServices.createOrder(orderData);

    const io = req.app.locals.io;
    if (io && typeof io.emit === "function") {
      console.log("Emitting newOrder event");
      io.emit("newOrder", { message: "A new order has been created.", order: orderData });
    } else {
      console.error("Socket.io instance is invalid.");
    }

    res.status(201).json({ status: 201, message: "Order created successfully", order: newOrder });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};
