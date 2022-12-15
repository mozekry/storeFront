import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import product_routes from './handlers/products_routes';
import users_routes from './handlers/users_routes';
import orders_routes from './handlers/orders_routes';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello Store Front!');
});

product_routes(app);
users_routes(app), orders_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});


export default app;