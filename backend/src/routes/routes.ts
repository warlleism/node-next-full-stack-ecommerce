import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { ProductController } from '../controllers/productController';
import { FavoriteController } from '../controllers/favoriteController';
import { SaleController } from '../controllers/saleController';
import { TokenController } from '../controllers/tokenController';

const routes = Router();

// user endpoints
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
routes.post('/user/register', new UserController().create);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
routes.post('/user/login', new UserController().login);

// products endpoints
/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               rate:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 */
routes.post('/product/create', authMiddleware, new ProductController().create);

/**
 * @swagger
 * /product/ourProducts:
 *   get:
 *     summary: Get our products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of our products
 */
routes.get('/product/ourProducts', new ProductController().getOurProducts);

/**
 * @swagger
 * /product/getAllProducts:
 *   post:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 */
routes.post('/product/getAllProducts', new ProductController().getAll);

/**
 * @swagger
 * /product/getAllProducts?page=1&limit=4:
 *   post:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 */
routes.post('/product/getAllProducts?page=1&limit=4', new ProductController().getAll);

/**
 * @swagger
 * /product/delete:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 */
routes.delete('/product/delete', authMiddleware, new ProductController().delete);

/**
 * @swagger
 * /product/update:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               rate:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 */
routes.put('/product/update', authMiddleware, new ProductController().update);

/**
 * @swagger
 * /product/search:
 *   post:
 *     summary: Search for products
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *     responses:
 *       200:
 *         description: Search results
 */
routes.post('/product/search', new ProductController().getSearch);

// favorites endpoints
/**
 * @swagger
 * /favorite/create:
 *   post:
 *     summary: Add a product to favorites
 *     tags: [Favorite]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Favorite added successfully
 *       401:
 *         description: Unauthorized
 */
routes.post('/favorite/create', authMiddleware, new FavoriteController().create);

/**
 * @swagger
 * /favorite/delete:
 *   delete:
 *     summary: Remove a product from favorites
 *     tags: [Favorite]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite removed successfully
 *       401:
 *         description: Unauthorized
 */
routes.delete('/favorite/delete', authMiddleware, new FavoriteController().delete);

/**
 * @swagger
 * /favorite/all:
 *   post:
 *     summary: Get all favorite products
 *     tags: [Favorite]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products_id:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: List of favorite products
 *       401:
 *         description: Unauthorized
 */
routes.post('/favorite/all', authMiddleware, new FavoriteController().get);

// sale endpoints
/**
 * @swagger
 * /sale/all:
 *   post:
 *     summary: Get all sales
 *     tags: [Sale]
 *     responses:
 *       200:
 *         description: List of sales
 */
routes.post('/sale/all', new SaleController().get);

// token
/**
 * @swagger
 * /valid/token:
 *   post:
 *     summary: Validate a token
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Unauthorized
 */
routes.post('/valid/token', new TokenController().validToken);

export default routes;
