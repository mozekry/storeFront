import { OrderStore } from '../models/orders';
import { user, UserRepo } from '../models/users';

const store = new OrderStore();

describe('Orders Models', () => {
    const userRepo = new UserRepo();
    let user_id: number;
    beforeAll(async () => {
        const user: user = await userRepo.create({
            firstname: 'Test',
            lastname: 'test',
            password: '1234',
        });
        user_id = user.id!;
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add an order', async () => {
        const result = await store.create({
            name: 'Order1',
            status: 'Active',
            user_id: user_id,
        });
        expect(result.name).toEqual('Order1');
        expect(result.status).toEqual('Active');
        expect(result.user_id).toEqual(user_id);
    });

    it('index method should return a list of Orders', async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'Order1',
                status: 'Active',
                user_id: user_id,
            },
        ]);
    });

    it('show method should return the correct Product', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'Order1',
            status: 'Active',
            user_id: user_id,
        });
    });
});
