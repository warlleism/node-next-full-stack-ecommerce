import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ProductController } from "../controllers/productController";
import { FavoriteController } from "../controllers/favoriteController";
import { SaleController } from "../controllers/saleController";
import { TokenController } from "../controllers/tokenController";
const routes = Router()

//user endpoints
routes.post('/user/register', new UserController().create)
routes.post('/user/login', new UserController().login)

//products endpoints
routes.post('/product/create', authMiddleware, new ProductController().create)
routes.get('/product/ourProducts', new ProductController().getOurProducts)
routes.post('/product/getAllProducts', new ProductController().getAll)
routes.delete('/product/delete', authMiddleware, new ProductController().delete)
routes.put('/product/update', authMiddleware, new ProductController().update)
routes.post('/product/search', new ProductController().getSearch)

//favorites endpoints
routes.post('/favorite/create', authMiddleware, new FavoriteController().create)
routes.delete('/favorite/delete', authMiddleware, new FavoriteController().delete)
routes.post('/favorite/all', authMiddleware, new FavoriteController().get)

//sale endpoints
routes.post('/sale/all', new SaleController().get)

//token
routes.post('/valid/token', new TokenController().validToken)

export default routes;