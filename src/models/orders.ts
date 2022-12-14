import client from '../database';

export type Orders = {
    id?: number;
    name: string;
    status: string;
    user_id: number;
};

export class OrderStore {
    async index(): Promise<Orders[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`ERROR HAPPENED ${error}`);
        }
    }
    async show(id: number): Promise<Orders> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';

            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }
    async create(b: Orders): Promise<Orders> {
        try {
            const sql =
                'INSERT INTO orders (status, user_id,name) VALUES($1, $2,$3) RETURNING *';

            const conn = await client.connect();
            const result = await conn.query(sql, [b.status, b.user_id, b.name]);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not add order ${b.status}. Error: ${err}`);
        }
    }

    async AddProduct(
        quantity: number,
        order_id: number,
        product_id: number
    ): Promise<Orders> {
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [
                quantity,
                order_id,
                product_id,
            ]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`ERROR HAPPENED ${error}`);
        }
    }
    async getOrderByUserID(userId: number): Promise<Orders> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not find order for user ${userId}. Error: ${err}`
            );
        }
    }

    async getCompletedOrderByUserID(userId: number): Promise<Orders> {
        try {
            const sql =
                "SELECT * FROM orders WHERE user_id=($1) and status = 'complete'";
            const conn = await client.connect();
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not find order for user ${userId}. Error: ${err}`
            );
        }
    }
}
