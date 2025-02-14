import mongoose, { Document, Schema } from 'mongoose';
import { userSchemaType } from '../../../types/model_type/user_model';
import { userRoleEnum } from '../../../enum/userRoleEnum';

const userImageSchema = new Schema({
  fname: { type: String },
  type: { type: String },
  data: { type: Buffer }
});

const userSchema: Schema<userSchemaType & Document> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(userRoleEnum), 
    },
    image: userImageSchema,
  },
  {
    timestamps: true,
  }
);

const users = mongoose.model<userSchemaType & Document>('users', userSchema);

export default users;
