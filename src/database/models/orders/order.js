const mongoose=require('mongoose')
const { orderStatusEnum, paymentStatusEnum } = require('../../../enum/orderStatusEnum')

const orderSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products', 
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      
      status: {
        type: String,
        enum: Object.values(orderStatusEnum),
        default: orderStatusEnum.unpaid,
      },
  
      paymentStatus: {
        type: String,
        enum: Object.values(paymentStatusEnum),
        default: paymentStatusEnum.cod,
      },
      
    
  
      totalPrice: {
        type: Number,
        required: true,
      },
  
      shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
  
      orderDate: {
        type: Date,
        default: Date.now,
      },
        
    },
    {
        timestamps:true
    }
)

const orders=mongoose.model('orders',orderSchema)

module.exports=orders