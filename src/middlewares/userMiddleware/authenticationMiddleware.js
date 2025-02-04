const jwt = require("jsonwebtoken");

exports.authenticationMiddleware=async(req,res,next)=>{
    try{
        const token=req.headers['authorization'].split(" ")[1]
        const jwtResponse=jwt.verify(token,process.env.SECRET_KEY)
        req.payload=jwtResponse
        next()
    }
    catch(error){
        res.json({status:401,message:"Authentication failed...please login"})
    }
}
