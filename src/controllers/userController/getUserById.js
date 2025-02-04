const { userService } = require("../../services")

exports.getUserById=async(req,res)=>{
    const _id=req.payload.uid
    try{
        const userById=await userService.getUserById(_id)
        res.json({status:200,message:'Get user details by id',userById:userById});
    }
    catch (error) {
        res.json({ status:400,message: 'Failed to retrieve user', error: error.message });
    }

    
}