const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
      },
      brand:{
        type:String,
        required:true
      },
      image:{
        fname: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        data: {
          type: Buffer,
          required: true,
        }
      },
      category:{
        type:String,
        required:true
      },
      description:{
        type:String,
      },
      rating:{
        type:Number,
        required:true,
        default:0,
      },
      price:{
        type:Number,
        required:true,
        default:0,
      },
    },
  {
    timestamps:true
  }
)

const products = mongoose.model("products", productSchema);


module.exports = products