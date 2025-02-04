const { orderStatusEnum, paymentStatusEnum } = require("../../enum/orderStatusEnum");

const createOrderPayload = {
  _id: "string",       
  user: "ObjectId", 
  products: [
    {
      product: "ObjectId",
      quantity: "number",
      price: "number",
    }
  ],
  status: orderStatusEnum.unpaid, 
  paymentStatus: paymentStatusEnum.cod, 
  totalPrice: "number", 
  shippingAddress: {
    street: "string", 
    city: "string", 
    postalCode: "string", 
    country: "string",
  },
  orderDate: "Date", 
  createdAt: "Date", 
  updatedAt: "Date",
};

module.exports = {
  createOrderPayload,
};
