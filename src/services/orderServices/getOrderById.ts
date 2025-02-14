import orders from "../../database/models/orders/order";
import { orderSchemaType } from "../../types/model_type/order_model_type";

export const getOrderById = async (id: string): Promise<orderSchemaType[]> => {
  try {
    const orderById = await orders.find({ user: id })
                                  .populate('user')
                                  .populate('products.product');
    return orderById;
  } 
  catch (error) {
    throw error;
  }
};
