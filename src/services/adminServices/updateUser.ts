import users from "../../database/models/users/users";

export const updateUser = async (id: string, newRole: string): Promise<any> => {
  try {
    const user = await users.findById(id); 
    if (!user) {
      throw new Error("User not found");
    }
    
    const updatedUser = await users.findByIdAndUpdate(
      id,
      { role: newRole }, 
      { new: true }
    );

    return updatedUser;
  } 
  catch (error) {
    throw error;
  }
};
