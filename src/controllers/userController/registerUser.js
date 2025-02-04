const users = require("../../database/models/users/users")
const bcrypt=require('bcrypt')
const { userService } = require("../../services")
const { body, validationResult } = require("express-validator");


exports.validateRegister = [
    body('username')
      .trim()
      .notEmpty().withMessage('Username is required')
      .matches(/^[a-zA-Z ]+$/).withMessage('Username must contain only letters and spaces'),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Password must contain only letters, numbers, and spaces'),
  ];


exports.registerUser=async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    
    const {password,...data}=req.body
    try{
        const existingUser=await users.findOne({email:data.email})
        if(existingUser){
            return res.json({status:400, message: 'User already exists' });
        }
        const hashPsw=await bcrypt.hash(password,10)

        const newUser=await userService.registerUser({...data,password:hashPsw})
        
        const responseUser = {
          _id: newUser._id.toString(),
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          image: newUser.image,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
      };
        res.json({status:201,message:'User created successfully', newUser:responseUser});
    }
    catch (error) {
        res.json({status:400, message: 'Failed to add user', error: error.message });
    }
}