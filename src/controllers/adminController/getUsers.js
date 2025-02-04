const { adminServices } = require("../../services")

exports.getUsers=async(req,res)=>{
    try{
        const allUsers=await adminServices.getUsers()
        res.json({status:200,message:'Get User details',allUsers:allUsers});
    }
    catch(error){
        res.json({ status:400,message: 'Failed to retrieve users', error: error.message });
    }
}