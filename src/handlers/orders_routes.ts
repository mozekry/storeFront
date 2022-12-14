import express, { Request, Response } from 'express';
import { Orders, OrderStore } from '../models/orders';
import verifyAuthToken from '../services/auth';

const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    const Order: Orders[] = await store.index();
    res.json(Order);
};

const create = async (req: Request, res: Response): Promise<void> => {
    const Order: Orders = {
        status: req.body.status,
        user_id: req.body.user_id,
        name: req.body.name,
    };

    try {
        const newOrder: Orders = await store.create(Order);
        res.json(newOrder);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const addProductToOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    const order_id: number = parseInt(req.params.id);
    const product_id: number = parseInt(req.body.product_id);
    const quantity: number = parseInt(req.body.quantity);

    try {
        const newOrder: Orders = await store.AddProduct(
            quantity,
            order_id,
            product_id
        );
        res.json(newOrder);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getOrderByUserID = async (req: Request, res: Response): Promise<void> => {
    const user_id: number = parseInt(req.params.userid);
    try {
        const newOrder: Orders = await store.getOrderByUserID(user_id);
        res.json(newOrder);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};
const getCompletedOrderByUserID = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user_id: number = parseInt(req.params.userid);
    try {
        const newOrder: Orders = await store.getCompletedOrderByUserID(user_id);
        res.json(newOrder);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const orders_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.post('/orders', create);
    app.post('/orders/:id/products', addProductToOrder);
    app.get('/orders/users/:userid', verifyAuthToken, getOrderByUserID);
    app.get(
        '/orders/complete/users/:userid',
        verifyAuthToken,
        getCompletedOrderByUserID
    );
};

export default orders_routes;
