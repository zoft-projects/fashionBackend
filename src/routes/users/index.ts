import express from 'express';
import { registerUser, loginUser, getUserById, updateProfile } from '../../controllers/userController';
import { createOrder, getOrderById, deleteOrder } from '../../controllers/orderController';
import { getAllProducts, getProductById } from '../../controllers/productController';
import { authenticationMiddleware } from '../../middlewares';
import { validateRegister } from '../../controllers/userController/registerUser';

const router = express.Router();

router.route('/register').post(validateRegister, registerUser);

router.route('/login').post(loginUser);

router.route('/get_user_by_id/:_id').get(authenticationMiddleware, getUserById);

router.route('/get_products').get(authenticationMiddleware, getAllProducts);

router.route('/get_products/:_id').get(authenticationMiddleware, getProductById);

router.route('/add_order').post(authenticationMiddleware, createOrder);

router.route('/get_order_by_id/:_id').get(authenticationMiddleware, getOrderById);

router.route('/delete_order/:_id').delete(authenticationMiddleware, deleteOrder);

router.route('/update_profile/:_id').put(authenticationMiddleware, updateProfile);

export default router;
