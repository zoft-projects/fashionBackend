import users from "../../database/models/users/users";
import bcrypt from "bcrypt";
import { userSchemaType } from "../../types/model_type/user_model";

export const loginUser = async (email: string, password: string): Promise<userSchemaType | null> => {
  try {
    const user = await users.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
};
