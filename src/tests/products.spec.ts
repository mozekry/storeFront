import { Product, ProductStore } from '../models/products';

const store = new ProductStore();

describe('Product Models', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await store.create({
            name: 'the hulk',
            price: 100,
            category: 'super Hero',
        });
        expect(result.name).toEqual('the hulk');
        expect(result.price).toEqual(100);
        expect(result.category).toEqual('super Hero');
    });

    it('index method should return a list of Products', async () => {
        const result = await store.index();
        const id = result[0].id;
        const selectedResult:Product[] = result.filter(a=>a.id == id);
        expect(selectedResult).toEqual([
            {
                id: id,
                name: 'the hulk',
                price: 100,
                category: 'super Hero',
            },
        ]);
    });

    it('show method should return the correct Product', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'the hulk',
            price: 100,
            category: 'super Hero',
        });
    });
});
