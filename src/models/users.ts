import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type user = {
    id?: number;
    firstname: string;
    lastname: string;
    password?: string;
};
export type userlogin = {
    firstName: string;
    lastName: string;
    password: string;
};

export class UserRepo {
    async index(): Promise<user[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM USERS';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`ERROR HAPPENED ${error}`);
        }
    }

    async show(id: number): Promise<user> {
        try {
            const sql = 'SELECT * FROM USERS WHERE id=($1)';

            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find USER ${id}. Error: ${err}`);
        }
    }

    async create(b: user): Promise<user> {
        try {
            const sql =
                'INSERT INTO USERS (firstName, lastName,password) VALUES($1, $2, $3) RETURNING id, firstName, lastName';

            const hash = bcrypt.hashSync(
                b.password! + BCRYPT_PASSWORD,
                parseInt(SALT_ROUNDS ?? '')
            );
            const conn = await client.connect();

            const result = await conn.query(sql, [
                b.firstname,
                b.lastname,
                hash,
            ]);

            const user = result.rows[0];

            conn.release();

            return user;
        } catch (err) {
            throw new Error(
                `Could not add new USER ${b.firstname} ${b.lastname}. Error: ${err}`
            );
        }
    }

    async authenticate(
        firstName: string,
        lastName: string,
        password: string
    ): Promise<user | null> {
        try {
            const conn = await client.connect();
            const sql =
                'select firstName,lastName, password FROM users WHERE firstName = ($1) and lastName = ($2)';
            const result = await conn.query(sql, [firstName, lastName]);
            if (result.rows.length) {
                const user: user = result.rows[0];
                console.log('user', user);
    
                if (
                    bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password!)
                ) {
                    return user;
                }
            }
            return null;
        } catch (error) {
            throw new Error(
                `Could not authenticate USER ${firstName} ${lastName}. Error: ${error}`
            );
        }
       
    }
}
