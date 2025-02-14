import express from 'express';
import {  updateProduct, deleteProduct, getProductById, addProduct } from '../../controllers/productController';
import { getUsers, deleteUser } from '../../controllers/adminController';
import { updateUser } from '../../controllers/adminController/updateUser';
import { getAllProducts } from '../../controllers/productController/getAllProducts';
import { getOrders } from '../../controllers/orderController';
import { updateOrder } from '../../controllers/orderController/updateOrder';
import { authenticationMiddleware, identityMiddleware } from '../../middlewares';

const router = express.Router();

router.route('/add').post(authenticationMiddleware, identityMiddleware("super-admin", "admin"), addProduct);

router.route('/get_users').get(authenticationMiddleware,identityMiddleware("super-admin", "admin","field-staff"), getUsers);

router.route('/delete_user/:_id').delete(authenticationMiddleware, identityMiddleware("super-admin"), deleteUser);

router.route('/update_user/:_id').put(authenticationMiddleware, identityMiddleware("super-admin"), updateUser);

router.route('/get_products').get(authenticationMiddleware,identityMiddleware("super-admin", "admin","field-staff"), getAllProducts);

router.route('/get_products/:_id').get(authenticationMiddleware, getProductById);

router.route('/edit_product/:_id').put(authenticationMiddleware, identityMiddleware("super-admin", "admin"), updateProduct);

router.route('/delete_product/:_id').delete(authenticationMiddleware, identityMiddleware("super-admin"), deleteProduct);

router.route('/get_orders').get(authenticationMiddleware,identityMiddleware("super-admin","admin","field-staff"), getOrders);

router.route('/update_order/:_id').put(authenticationMiddleware, identityMiddleware("super-admin"), updateOrder);

export default router;
