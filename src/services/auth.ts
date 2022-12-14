import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token =
            authorizationHeader != undefined
                ? authorizationHeader.split(' ')[1]
                : '';
        jwt.verify(token, TOKEN_SECRET != undefined ? TOKEN_SECRET : '');
        next();
    } catch (error) {
        res.sendStatus(401);
    }
};

export default verifyAuthToken;
