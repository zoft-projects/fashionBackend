import users from "../../database/models/users/users";
import { userSchemaType } from "../../types/model_type/user_model";

export const getUserById = async (id: string): Promise<userSchemaType | null> => {
  try {
    const userById = await users.findById(id);
    return userById;
  } 
  catch (error) {
    throw error;
  }
};
