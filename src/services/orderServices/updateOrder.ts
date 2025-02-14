import orders from "../../database/models/orders/order";

export const updateOrder = async (id: string, status: string): Promise<any> => {
  try {
    const updatedOrder = await orders.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};
