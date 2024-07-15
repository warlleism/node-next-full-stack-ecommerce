import { Request, Response } from "express";
import { productRepository } from "../repositories/productRepository";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { deleteImage, saveImageToFile } from "../utils/fileUtils";
import fs from 'fs';
import { saleRepository } from "../repositories/saleRepository";
import { returnFavorites } from "../utils/favoritesUtil";

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
        return res.status(200).json({ message: "Product registered successfully", data: newUser });
    }

    async getAll(req: Request, res: Response) {

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const { authorization } = req.headers;

        const fetchProducts = async () => {
            const [products, total] = await productRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });

            if (!products.length) throw new Error("No products found.");



            const allProducts = await Promise.all(products.map(async product => {
                const data = await fs.promises.readFile(product.image, 'base64');
                return { ...product, image: data };
            }));


            return { allProducts, total };
        };

        try {
            const { allProducts, total } = await fetchProducts();

            let favorite_products = await returnFavorites(authorization)

            return res.status(200).json({
                favorites: favorite_products,
                message: "All products with images!",
                data: allProducts,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            });
        } catch (error) {
            return res.status(404).json({ message: error });
        }
    }

    async getOurProducts(req: Request, res: Response) {
        const { authorization } = req.headers;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const fetchProducts = async () => {
            const [products, total] = await productRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });
            if (!products.length) throw new Error("No products found.");
            const allProducts = await Promise.all(products.map(async product => {
                const data = await fs.promises.readFile(product.image, 'base64');
                return { ...product, image: data };
            }));
            return { allProducts, total };
        };

        try {
            if (authorization) {
                try {
                    const favorite_products = await returnFavorites(authorization)
                    const { allProducts, total } = await fetchProducts();
                    const sales = await saleRepository.find();
                    const saleIds = new Set(sales.map(sale => String(sale.product_id)));
                    const filteredProducts = allProducts.filter(product => !saleIds.has(String(product.id)));

                    return res.status(200).json({
                        favorites: favorite_products,
                        message: "All products with images!",
                        data: filteredProducts,
                        currentPage: page,
                        totalPages: Math.ceil(total / limit),
                    });

                } catch (error) {
                    const { allProducts, total } = await fetchProducts();
                    return res.status(200).json({
                        message: "All products with images!",
                        data: allProducts,
                        currentPage: page,
                        totalPages: Math.ceil(total / limit),
                    });
                }
            } else {
                const { allProducts, total } = await fetchProducts();
                return res.status(200).json({
                    message: "All products with images!",
                    data: allProducts,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                });
            }
        } catch (error) {
            if (error) {
                return res.status(404).json({ message: error });
            }
            return res.status(401).json({ message: 'Token not authorized' });
        }
    }


    async getSearch(req: Request, res: Response) {
        const { search } = req.body;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const { authorization } = req.headers;

        if (!search) {
            throw new BadRequestError('required product name');
        }

        const products = await productRepository.find();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));

        const sales = await saleRepository.find();

        const itensWithSale = filteredProducts.map((data) => {
            const saleInfo = sales.find((item) => item.product_id == data.id);
            return saleInfo ? { ...data, sale: saleInfo.sale } : data;
        });

        if (itensWithSale.length === 0) { throw new BadRequestError('Product not found.') }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedProducts = itensWithSale.slice(startIndex, endIndex);

        const productsWithImages = paginatedProducts.map(product => {
            const imagePath = product.image;
            const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });
            return { ...product, image: imageData };
        });

        const totalPages = Math.ceil(itensWithSale.length / limit);

        let ids: number[] | null = authorization ? [] : null;

        if (authorization) {
            ids = await returnFavorites(authorization)
        }

        return res.status(200).json({
            message: "Products found!",
            data: productsWithImages,
            favorites: ids,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: itensWithSale.length,
                itemsPerPage: limit
            }
        });
    }


    async delete(req: Request, res: Response) {

        const { productId } = req.body;
        if (!productId) { throw new BadRequestError('Product ID required') }

        const productImage = await productRepository.findOneBy({ id: productId });
        if (productImage?.name) { await deleteImage(productImage.name) }
        else {
            throw new BadRequestError('Fail to delete image.')
        }

        const product = await productRepository.delete({ id: productId });
        if (!product) {
            throw new BadRequestError('Product not found.')
        }

        res.status(200).json({ massage: 'Product and image deleted successfully.' });
    }

    async update(req: Request, res: Response) {
        try {
            const { id, name, image, description, price, rate, category } = req.body;

            if (!name || !image || !description || !price || !rate || !category) {
                throw new UnauthorizedError("All fields must be filled in");
            }

            const product = await productRepository.findOneBy({ id });

            if (!product) {
                throw new BadRequestError('Product not found.');
            }

            product.name = name;
            product.description = description;
            product.price = price;
            product.rate = rate;
            product.category = category;

            const filename = `${name}.png`;
            let imagePath;

            imagePath = await saveImageToFile(image, filename);

            product.image = imagePath;

            await productRepository.save(product);

            res.status(200).json({ message: 'Product has been updated successfully', data: product });
        } catch (error) {
            if (error instanceof UnauthorizedError || error instanceof BadRequestError) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }




}
