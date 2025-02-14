import users from "../../database/models/users/users";

export const getUsers = async (): Promise<any[]> => {
  try {
    const allUsers = await users.find();
    return allUsers;
  } 
  catch (error) {
    throw error;
  }
};
