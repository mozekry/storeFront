import express, { NextFunction, Request, Response } from 'express';
import { user, userlogin, UserRepo } from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../services/auth';

dotenv.config();
const { TOKEN_SECRET } = process.env;
const store = new UserRepo();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const user: user[] = await store.index();
        res.json(user);
        
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};
  

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: user = await store.show(parseInt(req.params.id));
        res.json(user);
        
    } catch (error) {
        res.status(400);
        res.json(error);
    }

};
const create = async (req: Request, res: Response): Promise<void> => {
    const user: user = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: req.body.password,
    }
    try {
        const newUser: user = await store.create(user);
        const token = jwt.sign({ user: newUser }, TOKEN_SECRET ?? '');
        res.json(token);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
  
};

const getUserToken = async (req: Request, res: Response): Promise<void> => {
    const user: user = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: req.body.password,
    };
    try {
        const newUser: user | null = await store.authenticate(
            user.firstname,
            user.lastname,
            user.password!
        );
        if (newUser) {
            const token = jwt.sign({ user: newUser }, TOKEN_SECRET ?? '');
            res.json(token);
        } else {
            res.send(`user doesn't exist`).status(401);
        }
    } catch (error) {
        res.status(400);
        res.json(error);
    }
   
};

const users_routes = (app: express.Application) => {
    app.get('/users/:id', verifyAuthToken, show);
    app.get('/users', verifyAuthToken, index);
    app.post('/users', create);
    app.post('/users/login', getUserToken);
};

export default users_routes;
