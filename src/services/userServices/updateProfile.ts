import users from "../../database/models/users/users";
import { userSchemaType } from "../../types/model_type/user_model";

export const updateProfile = async (
  id: string,
  base64Image: string,
  fileName: string,
  fileType: string
): Promise<userSchemaType | null> => {

  const imageBuffer = Buffer.from(base64Image, "base64");
  try {
    const updatedUser = await users.findByIdAndUpdate(
      id,
      {
        image: {
          fname: fileName,
          type: fileType,
          data: imageBuffer,
        },
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
