import { Request, Response } from "express"
import { UnauthorizedError } from "../helpers/api-erros"
import { cartRepository } from "../repositories/cartRepository"
import { userRepository } from "../repositories/userRepository"
import { productRepository } from "../repositories/productRepository"

export class CartController {

    async create(req: Request, res: Response) {
        const { user_id, product_id } = req.body
        if (!user_id || !product_id) { throw new UnauthorizedError("The data needs to be filled in.") }

        const productExists = await productRepository.findOneBy({ id: product_id })
        const userExists = await userRepository.findOneBy({ id: user_id })
        const cartExists = await cartRepository.findBy({ product_id: product_id, user_id: user_id })

        if (cartExists.length !== 0) { throw new UnauthorizedError("Product already in cart.") }
        if (!productExists || !userExists) { throw new UnauthorizedError("Product or user does not exist.") }

        const newProduct = cartRepository.create({ user_id, product_id })

        await cartRepository.save(newProduct)

        const { ...cart } = newProduct
        return res.status(200).json({ message: "Successfully add product in cart", data: cart })
    }

    async delete(req: Request, res: Response) {
        const { user_id, product_id } = req.body
        if (!user_id || !product_id) { throw new UnauthorizedError("The data needs to be filled in.") }
        const cartExists = await cartRepository.findBy({ product_id: product_id, user_id: user_id })
        if (!cartExists) { throw new UnauthorizedError("cart does not exist.") }
        cartRepository.delete({ id: cartExists[0]?.id })
        return res.status(200).json({ message: "successfully removed" })
    }

    // async get(req: Request, res: Response) {
    //     const { products_id }: { products_id: number[] } = req.body;

    //     if (!Array.isArray(products_id) || products_id.length === 0) {
    //         throw new UnauthorizedError("The data needs to be filled in.");
    //     }

    //     const products = await cartRepository.findBy({ id: In(products_id) });

    //     if (!products) {
    //         throw new UnauthorizedError("Product not favorited.")
    //     }

    //     const filteredProducts = products.map(product => {
    //         const imagePath = product.image;
    //         product.image = fs.readFileSync(imagePath, { encoding: 'base64' });
    //         return product
    //     })

    //     if (!filteredProducts || filteredProducts.length === 0) {
    //         throw new UnauthorizedError("Product not favorited.")
    //     }

    //     return res.status(200).json({ message: "Successfully! all products", data: filteredProducts })
    // }

}