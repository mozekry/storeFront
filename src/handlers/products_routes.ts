import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import verifyAuthToken from '../services/auth';

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const Order: Product[] = await store.index();
        res.json(Order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
  
};

const show = async (_req: Request, res: Response): Promise<void> => {
    try {
        const product: Product = await store.show(parseInt(_req.params.id));
        res.json(product);
        
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };

    try {
        const newProduct: Product = await store.create(product);
        res.json(newProduct);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getProductbyCategory = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const product: Product[] = await store.getProductByCategory(
            _req.query.category?.toString()
        );
        res.json(product);
        
    } catch (error) {
        res.status(400);
        res.json(error);
    }

};

const getPopularProduct = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const product: Product[] = await store.getPopularProduct();
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }

};

const product_routes = (app: express.Application) => {
    // app.get('/products/:id', );
    app.get('/products/popular', verifyAuthToken, getPopularProduct);
    app.get('/products', index);
    app.get('/productsbycategory', verifyAuthToken, getProductbyCategory);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
};

export default product_routes;
