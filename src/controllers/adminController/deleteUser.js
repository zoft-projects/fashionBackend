const { adminServices } = require("../../services")

exports.deleteUser=async(req,res)=>{
    const {_id}=req.params 
    console.log('Deleting user with ID:', _id);
    try{
        const deleteUser=await adminServices.deleteUser(_id)
        res.json({status:200,message:"User deleted successfully",deleteUser:deleteUser})
    }
    catch(error){
        res.json({status:400,message:"Failed to delete user",error:error.message})
    }
}