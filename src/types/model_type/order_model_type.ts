import mongoose from "mongoose";
import { orderStatusEnum, paymentStatusEnum } from "../../enum/orderStatusEnum";

type orderedProductSchemaType={
    product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

type shippingSchemaType={
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

type orderSchemaType={
  _id?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  products: orderedProductSchemaType[];
  status: orderStatusEnum;
  paymentStatus: paymentStatusEnum;
  totalPrice: number;
  shippingAddress: shippingSchemaType;
  orderDate?: Date;
  createdAt?: Date;  
  updatedAt?: Date; 

}

export{
    orderedProductSchemaType,
    shippingSchemaType,
    orderSchemaType
}