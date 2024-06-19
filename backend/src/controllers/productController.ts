import { Request, Response } from "express";
import { productRepository } from "../repositories/productRepository";
import { BadRequestError, Base64Error, UnauthorizedError } from "../helpers/api-erros";
import { deleteImage, saveImageToFile } from "../utils/fileUtils";
import { favoriteRepository } from "../repositories/favoriteRepository";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
import fs from 'fs';

export class ProductController {

    async create(req: Request, res: Response) {
        const { name, image, description, price, rate, category } = req.body;

        if (!name || !image || !description || !price || !rate || !category) {
            throw new UnauthorizedError("Data needs to be filled in")
        }

        const productExists = await productRepository.findOneBy({ name });

        if (productExists) {
            throw new UnauthorizedError('Product already exists')
        }

        const filename = `${name}.png`;
        let imagePath;

        imagePath = await saveImageToFile(image, filename);

        const newUser = productRepository.create({
            name,
            image: imagePath,
            description,
            price,
            rate,
            category
        });

        await productRepository.save(newUser);
        const { ...user } = newUser;
        return res.status(200).json({ message: "Product registered successfully", data: user });
    }

    async getAll(req: Request, res: Response) {

        const { authorization } = req.headers;

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;


        if (typeof authorization !== 'undefined') {
            const token = authorization.split(' ')[1];

            if (token) {
                try {
                    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
                    const favoriteExists = await favoriteRepository.findBy({ user_id: id });
                    const productArray: number[] = [];
                    const productMap = favoriteExists.map((e) => { productArray.push(e.product_id) });

                    const [products, total] = await productRepository.findAndCount({
                        skip: (page - 1) * limit,
                        take: limit,
                    });

                    if (!products || products.length === 0) {
                        return res.status(404).json({ message: "No products found." });
                    }

                    const allProducts = await Promise.all(products.map(async product => {
                        const imagePath = product.image;
                        const data = await fs.promises.readFile(imagePath, 'base64');
                        return { ...product, image: data };
                    }));

                    return res.status(200).json({
                        message: "All products with images!",
                        data: allProducts,
                        favorites: productArray,
                        currentPage: page,
                        totalPages: Math.ceil(total / limit),
                    });
                } catch (error) {
                    return res.status(401).json({ message: 'Token not authorized' })
                }
            }
        } else {
            const [products, total] = await productRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });

            if (!products || products.length === 0) {
                return res.status(404).json({ message: "No products found." });
            }

            const allProducts = await Promise.all(products.map(async product => {
                const imagePath = product.image;
                const data = await fs.promises.readFile(imagePath, 'base64');
                return { ...product, image: data };
            }));

            return res.status(200).json({
                message: "All products with images!",
                data: allProducts,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            });
        }
    }


    async getSearch(req: Request, res: Response) {
        const { search } = req.body;

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        if (!search) {
            throw new BadRequestError('required product name');
        }

        const products = await productRepository.find();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );

        if (filteredProducts.length === 0) {
            throw new BadRequestError('Product not found.');
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        const productsWithImages = paginatedProducts.map(product => {
            const imagePath = product.image;
            const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });
            return { ...product, image: imageData };
        });

        const totalPages = Math.ceil(filteredProducts.length / limit);

        return res.status(200).json({
            message: "Products found!",
            data: productsWithImages,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: filteredProducts.length,
                itemsPerPage: limit
            }
        });
    }


    async delete(req: Request, res: Response) {

        const { id } = req.body;
        if (!id) { throw new BadRequestError('Product ID required') }

        const productImage = await productRepository.findOneBy({ id: id });
        if (productImage?.name) { await deleteImage(productImage.name) }
        else {
            throw new BadRequestError('Fail to delete image.')
        }

        const product = await productRepository.delete({ id: id });
        if (!product) {
            throw new BadRequestError('Product not found.')
        }

        res.status(200).json({ massage: 'Product and image deleted successfully.' });
    }

    async update(req: Request, res: Response) {

        const { id, name, image, description, price, rate, category } = req.body;
        if (!name || !image || !description || !price || !rate || !category) { throw new UnauthorizedError("Data needs to be filled in") }

        const product = await productRepository.findOneBy({ id: id });
        if (!product) {
            throw new BadRequestError('Product not found.')
        }

        product.category
        product.description
        product.image
        product.name
        product.price
        product.rate

        await productRepository.save(product);

        res.status(200).json({ massage: 'product has been updated successfully' });
    }




}
