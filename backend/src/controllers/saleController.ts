import { Request, Response } from "express"
import { saleRepository } from "../repositories/saleRepository"
import { productRepository } from "../repositories/productRepository";
import { In } from "typeorm";
import fs from 'fs';
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
import { favoriteRepository } from "../repositories/favoriteRepository";

export class SaleController {

    async get(req: Request, res: Response) {

        const { authorization } = req.headers;

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        if (typeof authorization !== 'undefined') {
            const token = authorization.split(' ')[1];

            if (token) {
                try {
                    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
                    const favoriteExists = await favoriteRepository.findBy({ user_id: id });
                    const productMap = favoriteExists.map((e) => e.product_id);

                    const sales = await saleRepository.find();
                    const ids = sales.map((sale) => sale.product_id);

                    const [products, total] = await productRepository.findAndCount({
                        where: { id: In(ids) },
                        skip: (page - 1) * limit,
                        take: limit,
                    });

                    if (!products || products.length === 0) {
                        return res.status(404).json({ message: "No products found." });
                    }

                    const filteredProducts = await Promise.all(products.map(async product => {
                        const imagePath = product.image;
                        const data = await fs.promises.readFile(imagePath, 'base64');
                        return { ...product, image: data };
                    }));

                    return res.status(200).json({
                        message: "Successfully fetched all products",
                        data: filteredProducts,
                        favorites: productMap,
                        currentPage: page,
                        totalPages: Math.ceil(total / limit),
                    });

                } catch (error) {
                    return res.status(401).json({ message: 'Token not authorized' });
                }
            }

        } else {
            const sales = await saleRepository.find();
            const ids = sales.map((sale) => sale.product_id);

            const [products, total] = await productRepository.findAndCount({
                where: { id: In(ids) },
                skip: (page - 1) * limit,
                take: limit,
            });

            if (!products || products.length === 0) {
                return res.status(404).json({ message: "No products found." });
            }

            const filteredProducts = await Promise.all(products.map(async product => {
                const imagePath = product.image;
                const data = await fs.promises.readFile(imagePath, 'base64');
                return { ...product, image: data };
            }));

            return res.status(200).json({
                message: "Successfully fetched all products",
                data: filteredProducts,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            });
        }
    }


}