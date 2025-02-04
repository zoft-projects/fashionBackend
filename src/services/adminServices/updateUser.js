const users = require("../../database/models/users/users");

exports.updateUser = async (id,newRole) => {
  try {
    const user = await users.findById(id); 
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = await users.findByIdAndUpdate(
      id,
      { role:newRole }, 
      { new: true } 
    );

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
