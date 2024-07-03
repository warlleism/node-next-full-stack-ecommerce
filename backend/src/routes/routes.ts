import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ProductController } from "../controllers/productController";
import { FavoriteController } from "../controllers/favoriteController";
import { SaleController } from "../controllers/saleController";
const routes = Router()

routes.post('/user/register', new UserController().create)
routes.post('/user/login', new UserController().login)

routes.post('/product/create', authMiddleware, new ProductController().create)
routes.get('/product/ourProducts', new ProductController().getOurProducts)
routes.post('/product/getAllProducts', new ProductController().getAll)
routes.delete('/product/delete', authMiddleware, new ProductController().delete)
routes.put('/product/update', authMiddleware, new ProductController().update)
routes.post('/product/search', new ProductController().getSearch)

routes.post('/favorite/create', authMiddleware, new FavoriteController().create)
routes.delete('/favorite/delete', authMiddleware, new FavoriteController().delete)
routes.post('/favorite/all', authMiddleware, new FavoriteController().get)

routes.post('/sale/all', new SaleController().get)

export default routes;