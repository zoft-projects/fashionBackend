const { orderStatusEnum, paymentStatusEnum } = require("../../enum/orderStatusEnum");

const createOrderInput = {
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
};

module.exports = {
  createOrderInput,
};
