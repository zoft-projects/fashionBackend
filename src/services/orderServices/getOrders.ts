import orders from "../../database/models/orders/order";
import { orderSchemaType } from "../../types/model_type/order_model_type";

export const getOrders = async (): Promise<orderSchemaType[]> => {
  try {
    const allOrders = await orders.find().populate('products.product');
    return allOrders;
  }
   catch (error) {
    throw error;
  }
};
