import mongoose from "mongoose";

type productImageSchemaType={
  fname: string;
  type: string;
  data: string;
};

type productSchemaType={
   _id?: mongoose.Types.ObjectId;
   name:string;
   brand:string;
   image:productImageSchemaType;
   category:string;
   description?:string;
   rating:Number;
   price:Number;
   createdAt?: Date;  
   updatedAt?: Date; 
}


export{
  productImageSchemaType,
  productSchemaType
}
