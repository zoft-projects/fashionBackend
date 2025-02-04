const { userService } = require("../../services");

exports.updateProfile=async(req,res)=>{
    const { _id } = req.params;
    const { base64Image, fileName, fileType } = req.body;

    try{
        const updatedUser=await userService.updateProfile(_id,base64Image, fileName, fileType)
        res.json({status:200,message:"Profile updated successfully",updatedUser:updatedUser})
    }
    catch(error){
        res.json({ status:400,message: 'Failed to update', error: error.message });       
    }

}