const { adminServices } = require("../../services");

exports.updateUser=async(req,res)=>{
    const {_id}=req.params

    try{
        const updatedUser=await adminServices.updateUser(_id,"admin")
        
        res.json({status:200,message:"User updated successfully", updatedUser:updatedUser})
    }
    catch(error){
        res.json({ status:400,message: 'Failed to update', error: error.message });       
    }
}