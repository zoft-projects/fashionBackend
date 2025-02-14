import users from "../../database/models/users/users";

export const deleteUser = async (id: string): Promise<any> => {
  try {
    const deletedUser = await users.findOneAndDelete({ _id: id });
    return deletedUser;
  } catch (error) {
    throw error;
  }
};
