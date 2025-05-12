import express from 'express';
import {  updateProduct, deleteProduct, getProductById, addProduct } from '../../controllers/productController';
import { getUsers, deleteUser } from '../../controllers/adminController';
import { updateUser } from '../../controllers/adminController/updateUser';
import { getAllProducts } from '../../controllers/productController/getAllProducts';
import { getOrders } from '../../controllers/orderController';
import { updateOrder } from '../../controllers/orderController/updateOrder';
import { authenticationMiddleware, identityMiddleware } from '../../middlewares';

const router = express.Router();

/**
 * @swagger
 * /api/admin/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     x-access-control:
 *       roles: [admin, superadmin] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - brand
 *               - image
 *               - category
 *               - description
 *               - rating
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tshirt"
 *               brand:
 *                 type: string
 *                 example: "Adidas"
 *               image:
 *                 type: object
 *                 properties:
 *                   fname:
 *                     type: string
 *                     example: "tshirt.png"
 *                   type:
 *                     type: string
 *                     example: "image/png"
 *                   data:
 *                     type: string
 *                     format: binary
 *               category:
 *                 type: string
 *                 example: "Men"
 *               description:
 *                 type: string
 *                 example: "Round neck tshirt"
 *               rating:
 *                 type: number
 *                 example: 4.8
 *               price:
 *                 type: number
 *                 example: 1299
 *     responses:
 *       201:
 *         description: Product added successfully
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
 *                   example: Product added successfully
 *                 product:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Tshirt"
 *                     brand:
 *                       type: string
 *                       example: "Adidas"
 *                     image:
 *                       type: object
 *                       properties:
 *                         fname:
 *                           type: string
 *                           example: "tshirt.png"
 *                         type:
 *                           type: string
 *                           example: "image/png"
 *                         data:
 *                           type: string
 *                           format: binary
 *                     category:
 *                       type: string
 *                       example: "Men"
 *                     description:
 *                       type: string
 *                       example: "Round neck Tshirt"
 *                     rating:
 *                       type: number
 *                       example: 4.8
 *                     price:
 *                       type: number
 *                       example: 1299
 *       500:
 *         description: Failed to add product
 */

router.route('/add').post(authenticationMiddleware, identityMiddleware("super-admin", "admin"), addProduct);

/**
 * @swagger
 * /api/admin/get_users:
 *   get:
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     x-access-control:
 *       roles: [admin, superadmin,field-staff] 
 *     summary: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
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
 *                   example: Get User details
 *                 allUsers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b2f9b1d8e3f57d3d2b3
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: johndoe@gmail.com
 *                       role:
 *                         type: string
 *                         example: admin
 *       400:
 *         description: Failed to retrieve users
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
 *                   example: Failed to retrieve users
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.route('/get_users').get(authenticationMiddleware,identityMiddleware("super-admin", "admin","field-staff"), getUsers);

/**
 * @swagger
 * /api/admin/delete_user/{_id}:
 *   delete:
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     x-access-control:
 *       roles: [superadmin] 
 *     summary: Delete a user by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *           example: 60d21b2f9b1d8e3f57d3d2b3
 *     responses:
 *       200:
 *         description: Successfully deleted the user
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
 *                   example: User deleted successfully
 *                 deleteUser:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b2f9b1d8e3f57d3d2b3
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     role:
 *                       type: string
 *                       example: admin
 *       400:
 *         description: Failed to delete the user
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
 *                   example: Failed to delete user
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.route('/delete_user/:_id').delete(authenticationMiddleware, identityMiddleware("super-admin"), deleteUser);

/**
 * @swagger
 * /api/admin/update_user/{_id}:
 *   put:
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     x-access-control:
 *       roles: [superadmin] 
 *     summary: Update the role of a user by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The ID of the user whose role needs to be updated
 *         schema:
 *           type: string
 *           example: 60d21b2f9b1d8e3ghhjggdtrhj
 *     responses:
 *       200:
 *         description: Successfully updated the user's role
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
 *                   example: User updated successfully
 *                 updatedUser:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b2f9b1d8e3f57d3d2b3
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     role:
 *                       type: string
 *                       example: admin
 *       400:
 *         description: Failed to update the user
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
 *                   example: Failed to update
 *                 error:
 *                   type: string
 *                   example: Error message
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.route('/update_user/:_id').put(authenticationMiddleware, identityMiddleware("super-admin"), updateUser);

/**
 * @swagger
 * /api/admin/get_products:
 *   get:
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     summary: Get all products, filtered by category
 *     parameters:
 *       - in: query
 *         name: category
 *         required: false
 *         description: The category to filter products by
 *         schema:
 *           type: string
 *           example: Women
 *     responses:
 *       200:
 *         description: Successfully retrieved product details
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
 *                   example: Get product details
 *                 allProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b2f9b1d8e3f57d3d2b3
 *                       name:
 *                         type: string
 *                         example: Crop Top
 *                       brand:
 *                         type: string
 *                         example: Roadster
 *                       category:
 *                         type: string
 *                         example: Women
 *                       description:
 *                         type: string
 *                         example: Roadster croptop
 *                       rating:
 *                         type: number
 *                         format: float
 *                         example: 4.5
 *                       price:
 *                         type: number
 *                         example: 499
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
 *                   example: Failed to retrieve products
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.route('/get_products').get(authenticationMiddleware, getAllProducts);

/**
 * @swagger
 * /api/admin/get_products/{_id}:
 *   get:
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     summary: Get product details by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *           example: 60d21b2f9b1d8e3f57d3d2b3
 *     responses:
 *       200:
 *         description: Successfully retrieved product details by ID
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
 *                   example: Get product details by id
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b2f9b1d8e3f57d3d2b3
 *                     name:
 *                       type: string
 *                       example: Top
 *                     brand:
 *                       type: string
 *                       example: Puma
 *                     category:
 *                       type: string
 *                       example: Women
 *                     description:
 *                       type: string
 *                       example: Printed Top
 *                     rating:
 *                       type: number
 *                       format: float
 *                       example: 4.5
 *                     price:
 *                       type: number
 *                       example: 499.99
 *       400:
 *         description: Failed to retrieve product
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
 *                   example: Failed to retrieve product
 *                 error:
 *                   type: string
 *                   example: Error message
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Product not found
 */
router.route('/get_products/:_id').get(authenticationMiddleware, getProductById);

/**
 * @swagger
 * /api/admin/edit_product/{_id}:
 *   put:
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     x-access-control:
 *       roles: [admin, superadmin] 
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *           example: 60d21b2f9b1d8e3f57d3d2b3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: T-Shirt
 *               brand:
 *                 type: string
 *                 example: Nike
 *               image:
 *                 type: object
 *                 properties:
 *                   fname:
 *                     type: string
 *                     example: tshirt_image.jpg
 *                   type:
 *                     type: string
 *                     example: image/jpeg
 *                   data:
 *                     type: string
 *                     format: byte
 *                     example: "/9j/4AAQSkZJRgABAQAAAQABAAD/..."
 *               category:
 *                 type: string
 *                 example: Clothing
 *               description:
 *                 type: string
 *                 example: Comfortable cotton T-shirt
 *               rating:
 *                 type: number
 *                 format: float
 *                 example: 4.5
 *               price:
 *                 type: number
 *                 example: 699
 *     responses:
 *       200:
 *         description: Successfully updated the product
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
 *                   example: Product updated successfully
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b2f9b1d8e3f57d3d2b3
 *                     name:
 *                       type: string
 *                       example: T-Shirt
 *                     brand:
 *                       type: string
 *                       example: Nike
 *                     category:
 *                       type: string
 *                       example: Men
 *                     description:
 *                       type: string
 *                       example: Comfortable cotton T-shirt
 *                     rating:
 *                       type: number
 *                       format: float
 *                       example: 4.5
 *                     price:
 *                       type: number
 *                       example: 699
 *       400:
 *         description: Invalid input, failed to update product
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
 *                   example: Failed to update product
 *                 error:
 *                   type: string
 *                   example: Error message
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Failed to update product
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.route('/edit_product/:_id').put(authenticationMiddleware, identityMiddleware("super-admin", "admin"), updateProduct);

/**
 * @swagger
 * /api/admin/delete_product/{_id}:
 *   delete:
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     x-access-control:
 *       roles: [superadmin] 
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *           example: 60d21b2f9b1d8e3f57d3d2b3
 *     responses:
 *       200:
 *         description: Successfully deleted the product
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
 *                   example: Product deleted successfully
 *                 deletedProduct:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b2f9b1d8e3f57d3d2b3
 *                     name:
 *                       type: string
 *                       example: T-Shirt
 *                     brand:
 *                       type: string
 *                       example: Nike
 *                     category:
 *                       type: string
 *                       example: Men
 *                     description:
 *                       type: string
 *                       example: Comfortable cotton T-shirt
 *                     rating:
 *                       type: number
 *                       format: float
 *                       example: 4.5
 *                     price:
 *                       type: number
 *                       example: 699
 *       400:
 *         description: Failed to delete the product
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
 *                   example: Failed to delete product
 *                 error:
 *                   type: string
 *                   example: Error message
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Failed to delete product
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.route('/delete_product/:_id').delete(authenticationMiddleware, identityMiddleware("super-admin"), deleteProduct);

/**
 * @swagger
 * /api/admin/get_orders:
 *   get:
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     x-access-control:
 *       roles: [admin, superadmin,field-staff] 
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of all orders
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
 *                   example: Get order details
 *                 allOrders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b2f9b1d8e3f57d3d2b3
 *                       userId:
 *                         type: string
 *                         example: 60d21b2f9b1d8e3f57d3d2b2
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
 *                                   example: 60d21b2f9b1d8e3f57d3d2b1
 *                                 name:
 *                                   type: string
 *                                   example: T-Shirt
 *                                 price:
 *                                   type: number
 *                                   example: 29.99
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                       totalAmount:
 *                         type: number
 *                         example: 59.98
 *                       status:
 *                         type: string
 *                         example: "shipped"
 *                       orderDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2021-07-21"
 *       400:
 *         description: Failed to retrieve orders
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
 *                   example: Failed to retrieve orders
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.route('/get_orders').get(authenticationMiddleware,identityMiddleware("super-admin","admin","field-staff"), getOrders);

/**
 * @swagger
 * /api/admin/update_order/{_id}:
 *   put:
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     x-access-control:
 *       roles: [superadmin] 
 *     summary: Update the status of an order
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The ID of the order to be updated
 *         schema:
 *           type: string
 *           example: 60d21b2f9b1d8e3f57d3d2b3
 *       - in: body
 *         name: status
 *         required: true
 *         description: The new status of the order
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: "shipped"
 *     responses:
 *       200:
 *         description: Successfully updated the order status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order status updated"
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21b2f9b1d8e3f57d3d2b3"
 *                     status:
 *                       type: string
 *                       example: "shipped"
 *                     totalAmount:
 *                       type: number
 *                       example: 59.98
 *                     orderDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2021-07-21T10:30:00Z"
 *       400:
 *         description: Invalid or missing status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update order status"
 *       500:
 *         description: Server error while updating order status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update order status"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.route('/update_order/:_id').put(authenticationMiddleware, identityMiddleware("super-admin"), updateOrder);

export default router;
