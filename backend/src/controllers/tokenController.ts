import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';

export class TokenController {

    async validToken(req: Request, res: Response) {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
            if (!decoded.id) {
                return res.status(401).json({ message: 'Token not authorized' });
            }
            const userToken = authorization.split(' ')[1];
            return res.status(200).json({ message: 'Token is valid', id: decoded.id, token: userToken });
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: 'Token expired' });
            }

            return res.status(401).json({ message: 'Token not authorized' });
        }
    }
}
