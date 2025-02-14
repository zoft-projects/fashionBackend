import mongoose, { Schema, Document } from 'mongoose';
import { productSchemaType } from '../../../types/model_type/product_model_type';

const productImageSchema = new Schema({
  fname: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Buffer, required: true },
});

const productSchema = new Schema<productSchemaType & Document>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: productImageSchema,
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model<productSchemaType & Document>('products', productSchema);

export default products;
