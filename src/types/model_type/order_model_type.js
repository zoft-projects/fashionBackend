const { orderStatusEnum, paymentStatusEnum } = require("../../enum/orderStatusEnum");

const orderModelType = {
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
  orderDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  orderModelType,
};
