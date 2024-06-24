import { Request, Response } from "express"
import { saleRepository } from "../repositories/saleRepository"
import { productRepository } from "../repositories/productRepository";
import { In } from "typeorm";
import fs from 'fs';

export class SaleController {

    async get(req: Request, res: Response) {
        const sales = await saleRepository.find();
        const ids = sales.map((sale) => sale.product_id);
        const products = await productRepository.findBy({ id: In(ids) });

        const filteredProducts = products.map(product => {
            const imagePath = product.image;
            product.image = fs.readFileSync(imagePath, { encoding: 'base64' });
            return product
        })

        return res.status(200).json({
            message: "Successfully fetched all products",
            data: filteredProducts
        });

    }

}