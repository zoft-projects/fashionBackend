const express=require('express');
const { addProduct, updateProduct, deleteProduct, getProductByid } = require('../../controllers/productController');
const { getUsers, deleteUser } = require('../../controllers/adminController');
const { updateUser } = require('../../controllers/adminController/updateUser');
const { getAllProducts } = require('../../controllers/productController/getProducts');
const { getOrders } = require('../../controllers/orderController');
const { updateOrder } = require('../../controllers/orderController/updateOrder');
const { authenticationMiddleware, identityMiddleware } = require('../../middlewares');
const router=express.Router()


router.route('/add').post(authenticationMiddleware,identityMiddleware("super-admin","admin"),addProduct)

router.route('/get_users').get(authenticationMiddleware,identityMiddleware("super-admin"),getUsers)

router.route('/delete_user/:_id').delete(authenticationMiddleware,identityMiddleware("super-admin"),deleteUser)

router.route('/update_user/:_id').put(authenticationMiddleware,identityMiddleware("super-admin"),updateUser)

router.route('/get_products').get(authenticationMiddleware,getAllProducts)

router.route('/get_products/:_id').get(authenticationMiddleware,getProductByid)

router.route('/edit_product/:_id').put(authenticationMiddleware,identityMiddleware("super-admin","admin"),updateProduct)

router.route('/delete_product/:_id').delete(authenticationMiddleware,identityMiddleware("super-admin"),deleteProduct)

router.route('/get_orders').get(authenticationMiddleware,identityMiddleware("super-admin"),getOrders)

router.route('/update_order/:_id').put(authenticationMiddleware,identityMiddleware("super-admin"),updateOrder)


module.exports=router