import mongoose, { Document, Schema } from "mongoose";
import { orderSchemaType } from "../../../types/model_type/order_model_type";
import { orderStatusEnum, paymentStatusEnum } from "../../../enum/orderStatusEnum";


const productsOrderedSchema = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref:'products', required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
});

const shippingAddressSchema=new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
})

const orderSchema=new Schema<orderSchemaType & Document>(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      
      products: [productsOrderedSchema],
      
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
      shippingAddress: shippingAddressSchema,
      orderDate: {
        type: Date,
        default: Date.now,
      },   
    },
    {
        timestamps:true
    }
)

const orders = mongoose.model<orderSchemaType & Document>('orders', orderSchema);

export default orders;
