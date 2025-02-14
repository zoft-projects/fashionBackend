import orders from "../../database/models/orders/order";
import { orderSchemaType } from "../../types/model_type/order_model_type";

export const deleteOrder = async (id: string): Promise<any> => {
  try {
    const deletedOrder = await orders.findByIdAndDelete({ _id: id });
    return deletedOrder;
  } 
  catch (error) {
    throw error;
  }
};
