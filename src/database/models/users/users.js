const mongoose=require('mongoose')
const userRoleEnum = require('../../../enum/userRoleEnum')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
      type: String,
      enum: Object.values(userRoleEnum),
      default: userRoleEnum.user,
      required: true,
    },
    image:{
        fname: {
          type: String,
        },
        type: {
          type: String,
        },
        data: {
          type: Buffer,
        }
      }
},
{
    timestamps: true
}
)

const users=mongoose.model('users',userSchema)
module.exports=users