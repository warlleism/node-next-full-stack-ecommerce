import { favoriteRepository } from "../repositories/favoriteRepository";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken'

export async function returnFavorites(authorization: any) {

    try {
        let favorite_ids: number[] | null = authorization ? [] : null;
        const token = authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
        const favoriteExists = await favoriteRepository.findBy({ user_id: id });
        const productMap = favoriteExists.map(e => e.product_id);
        favorite_ids = productMap;
        return favorite_ids
    } catch (error) {
        return null
    }

}
