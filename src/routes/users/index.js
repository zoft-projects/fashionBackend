const express=require('express')
const { registerUser, loginUser, getUserById, updateProfile } = require('../../controllers/userController')
const { createOrder, getOrderById, deleteOrder } = require('../../controllers/orderController')
const { getAllProducts, getProductByid } = require('../../controllers/productController')
const { authenticationMiddleware } = require('../../middlewares')
const { validateRegister } = require('../../controllers/userController/registerUser')
const router=express.Router()

router.route('/register').post(validateRegister,registerUser)

router.route('/login').post(loginUser)

router.route('/get_user_by_id/:_id').get(authenticationMiddleware,getUserById)

router.route('/get_products').get(authenticationMiddleware,getAllProducts)

router.route('/get_products/:_id').get(authenticationMiddleware,getProductByid)

router.route('/add_order').post(authenticationMiddleware,createOrder)

router.route('/get_order_by_id/:_id').get(authenticationMiddleware,getOrderById)

router.route('/delete_order/:_id').delete(authenticationMiddleware,deleteOrder)

router.route('/update_profile/:_id').put(authenticationMiddleware,updateProfile)

module.exports=router