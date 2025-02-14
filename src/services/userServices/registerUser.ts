import users from "../../database/models/users/users";
import { userSchemaType } from "../../types/model_type/user_model";

export const registerUser = async (data: Partial<userSchemaType>): 
Promise<string> => {
  try {
    const newUser = new users(data);
    await newUser.save();
    return  `User with email ${newUser.email} has been successfully registered.`;
  } 
  catch (error) {
    throw error;
  }
};
