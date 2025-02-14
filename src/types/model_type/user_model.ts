import mongoose from "mongoose";
import { userRoleEnum } from "../../enum/userRoleEnum";

type userImageSchemaType={
    fname?: string;
    type?: string;
    data?: Buffer;
}

type userSchemaType={
    _id?: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: userRoleEnum;
    image?: userImageSchemaType;
    createdAt?: Date;  
    updatedAt?: Date;
}

export{
    userImageSchemaType,
    userSchemaType
}