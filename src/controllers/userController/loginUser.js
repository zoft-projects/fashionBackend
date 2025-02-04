const { userService } = require("../../services")
const jwt = require("jsonwebtoken");

exports.loginUser=async(req,res)=>{

    const {email,password}=req.body 

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }
    
    try{
        const user=await userService.loginUser(email,password)
        if(user){
            const tokenPayload = {
                uid: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            };

            const token = jwt.sign(tokenPayload, process.env.SECRET_KEY,{expiresIn:'1h'});

            const responsePayload={
                ...tokenPayload,
                token
            }
            return res.json({
                status: 200,
                message: "Login success",
                user:responsePayload
                
            });
        }
        else {
            return res.json({
                status: 401,
                message: 'Invalid credentials',
            });
        }
    }
    catch (error) {
        return res.json({ status: 400, message: 'Failed to login', error: error.message });
    }
}