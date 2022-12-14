import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category?: string;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`ERROR HAPPENED ${error}`);
        }
    }
    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';

            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find Product ${id}. Error: ${err}`);
        }
    }
    async getProductByCategory(category?: string): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products WHERE category=($1)';

            const conn = await client.connect();

            const result = await conn.query(sql, [category]);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not find Product by category ${category}. Error: ${err}`
            );
        }
    }
    async getPopularProduct(): Promise<Product[]> {
        try {
            const sql = `select Count(order_id) orderCount,p.name productName from public.order_products op
            join public.products p on op.product_id = p.id
            group by product_id,p.name order by orderCount desc limit 5`;

            const conn = await client.connect();

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not find Popular Product by category. Error: ${err}`
            );
        }
    }
    async create(b: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (name, price,category) VALUES($1, $2,$3) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [b.name, b.price, b.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(`Could not add order ${b.name}. Error: ${err}`);
        }
    }
}
