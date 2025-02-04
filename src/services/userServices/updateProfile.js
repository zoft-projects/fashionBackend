const users = require("../../database/models/users/users");

exports.updateProfile=async(id,base64Image, fileName, fileType)=>{
    const imageBuffer = Buffer.from(base64Image, 'base64');
    try{
        const updatedUser=await users.findByIdAndUpdate(
            id,
            {
                image: {
                  fname: fileName,
                  type: fileType,
                  data: imageBuffer,
                },
              },
              { new: true }
        )
        return updatedUser
    }
    catch(error){
        throw error
    }
}