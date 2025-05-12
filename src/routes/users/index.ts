import express from 'express';
import { registerUser, loginUser, getUserById, updateProfile } from '../../controllers/userController';
import { createOrder, getOrderById, deleteOrder } from '../../controllers/orderController';
import { getAllProducts, getProductById } from '../../controllers/productController';
import { authenticationMiddleware } from '../../middlewares';
import { validateRegister } from '../../controllers/userController/registerUser';

const router = express.Router();

/**
 * @swagger
 * api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username, must contain only letters and spaces.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password, must contain only letters, numbers, and spaces.
 *               role:
 *                 type: string
 *                 description: The role of the user. Optional, defaults to "user".
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 newUser:
 *                   type: object
 *                   description: The newly created user object.
 *       400:
 *         description: Failed to create user (e.g., user already exists or validation errors).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Failed to add user"
 *                 error:
 *                   type: object
 *                   description: Error details.
 */
router.route('/register').post(validateRegister, registerUser);

/**
 * @swagger
 * api/users/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Users
 *     description: Authenticates a user by verifying their email and password, and returns a JWT token on success.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Login success"
 *                 token:
 *                   type: string
 *                   description: The JWT token issued to the user.
 *                 user:
 *                   type: object
 *                   description: The authenticated user object.
 *       400:
 *         description: Failed to login (e.g., missing credentials).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Failed to login"
 *       401:
 *         description: Invalid credentials (email/password mismatch).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 */
router.route('/login').post(loginUser);

/**
 * @swagger
 * /api/users/get_user_by_id/{_id}:
 *   get:
 *     summary: Retrieve user details by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: The ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Get user details by ID"
 *                 userById:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b6a6b5f1f95b21e4ca1c47"
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       400:
 *         description: Failed to retrieve user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve user"
 *                 error:
 *                   type: string
 *                   example: "Error message details"
 */
router.route('/get_user_by_id/:_id').get(authenticationMiddleware, getUserById);

/**
 * @swagger
 * /api/users/get_products:
 *   get:
 *     summary: Retrieve all products
 *     description: Get a list of all products, optionally filtered by category.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: category
 *         in: query
 *         description: The category to filter products by (optional).
 *         required: false
 *         schema:
 *           type: string
 *           example: "electronics"
 *     responses:
 *       200:
 *         description: A list of all products or filtered products by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60b6a6b5f1f95b21e4ca1c47"
 *                   name:
 *                     type: string
 *                     example: "Smartphone"
 *                   price:
 *                     type: number
 *                     example: 299.99
 *                   category:
 *                     type: string
 *                     example: "electronics"
 *       400:
 *         description: Failed to retrieve products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve products"
 */
router.route('/get_products').get(authenticationMiddleware, getAllProducts);

/**
 * @swagger
 * /api/products/get_products/{_id}:
 *   get:
 *     summary: Retrieve product details by ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: The ID of the product to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b6a6b5f1f95b21e4ca1c47"
 *     responses:
 *       200:
 *         description: The details of the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60b6a6b5f1f95b21e4ca1c47"
 *                 name:
 *                   type: string
 *                   example: "Tshirt"
 *                 price:
 *                   type: number
 *                   example: 299.99
 *                 category:
 *                   type: string
 *                   example: "Men"
 *       400:
 *         description: Failed to retrieve the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve product"
 */
router.route('/get_products/:_id').get(authenticationMiddleware, getProductById);

/**
 * @swagger
 * /api/users/add_order:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: A list of product IDs that are part of the order.
 *               paymentStatus:
 *                 type: string
 *                 description: The payment status of the order (e.g., 'paid', 'unpaid').
 *                 example: "unpaid"
 *               status:
 *                 type: string
 *                 description: The current status of the order (e.g., 'pending', 'shipped').
 *                 example: "unpaid"
 *               totalPrice:
 *                 type: number
 *                 description: The total price of the order.
 *                 example: 199.99
 *               shippingAddress:
 *                 type: string
 *                 description: The address where the order will be shipped.
 *                 example: "MG Road,Kannur"
 *     responses:
 *       201:
 *         description: Order successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Order created successfully"
 *                 order:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: "60b6a6b5f1f95b21e4ca1c47"
 *                     products:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "60b6a6b5f1f95b21e4ca1c47"
 *                     status:
 *                       type: string
 *                       example: "unpaid"
 *                     paymentStatus:
 *                       type: string
 *                       example: "unpaid"
 *                     totalPrice:
 *                       type: number
 *                       example: 199.99
 *                     shippingAddress:
 *                       type: string
 *                       example: "MG Road,Kannur"
 *       500:
 *         description: Failed to create order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create order"
 */
router.route('/add_order').post(authenticationMiddleware, createOrder);

/**
 * @swagger
 * /api/orders/get_order_by_id/{_id}:
 *   get:
 *     summary: Get order details by user ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: _id
 *         in: path
 *         required: true
 *         description: The ID of the user whose orders are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Get order details"
 *                 orderById:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "60b6a6b5f1f95b21e4ca1c47"
 *                           username:
 *                             type: string
 *                             example: "john_doe"
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                   example: "60b6a6b5f1f95b21e4ca1c48"
 *                                 name:
 *                                   type: string
 *                                   example: "Product 1"
 *                             quantity:
 *                               type: number
 *                               example: 2
 *                       totalPrice:
 *                         type: number
 *                         example: 99.99
 *                       shippingAddress:
 *                         type: string
 *                         example: "MG Road,Kannur"
 *       400:
 *         description: Failed to retrieve order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve order"
 *                 error:
 *                   type: string
 *                   example: "Some error message"
 */
router.route('/get_order_by_id/:_id').get(authenticationMiddleware, getOrderById);

/**
 * @swagger
 * /api/users/delete_order/{_id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: _id
 *         in: path
 *         required: true
 *         description: The ID of the order to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Order deleted successfully"
 *                 deletedOrder:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b6a6b5f1f95b21e4ca1c49"
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "60b6a6b5f1f95b21e4ca1c47"
 *                         username:
 *                           type: string
 *                           example: "john_doe"
 *                     totalPrice:
 *                       type: number
 *                       example: 699
 *       400:
 *         description: Failed to delete the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Failed to delete order"
 *                 error:
 *                   type: string
 *                   example: "Some error message"
 */
router.route('/delete_order/:_id').delete(authenticationMiddleware, deleteOrder);

/**
 * @swagger
 * /api/users/update_profile/{_id}:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: _id
 *         in: path
 *         required: true
 *         description: The ID of the user whose profile needs to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               base64Image:
 *                 type: string
 *                 description: The base64-encoded image data to update the user's profile image.
 *                 example: "iVBORw0KGgoAAAANSUhEUgAA"
 *               fileName:
 *                 type: string
 *                 description: The name of the image file.
 *                 example: "profile_pic.png"
 *               fileType:
 *                 type: string
 *                 description: The type of the image file.
 *                 example: "image/png"
 *     responses:
 *       200:
 *         description: Successfully updated the profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 updatedUser:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b6a6b5f1f95b21e4ca1c47"
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     image:
 *                       type: object
 *                       properties:
 *                         fname:
 *                           type: string
 *                           example: "profile_pic.png"
 *                         type:
 *                           type: string
 *                           example: "image/png"
 *                         data:
 *                           type: string
 *                           example: "iVBORw0KGgoAAAANSUhEUgAA..."
 *       400:
 *         description: Failed to update the profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Failed to update profile"
 *                 error:
 *                   type: string
 *                   example: "Some error message"
 */
router.route('/update_profile/:_id').put(authenticationMiddleware, updateProfile);

export default router;
