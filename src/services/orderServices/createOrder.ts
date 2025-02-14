import orders from "../../database/models/orders/order";
import { orderSchemaType } from "../../types/model_type/order_model_type";

export const createOrder = async (orderData: orderSchemaType)
: Promise<string> => {
  try {
    const newOrder = new orders(orderData);
    await newOrder.save();
    return `${newOrder.user} has placed an order`;
  } 
  catch (error) {
    throw error;
  }
};
