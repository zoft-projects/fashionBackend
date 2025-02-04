const db=require('./db')
const userModel=require('./models/users')
const productModel=require('./models/products')

module.exports={
    db,
    userModel,
    productModel
}