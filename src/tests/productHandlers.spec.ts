import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Product Routes', () => {
    let token: string

    beforeAll(async () => {
        const {body} = await request.post('/users').send({
            firstname: 'Test1',
            lastname: 'test1',
            password: '1234',
          });
        token = body;
      });



    it('Should Create Product return status 200', async () => {
        const res = await request
          .post('/products')
          .send({
            name: 'the hulk',
            price: 100,
            category: 'super Hero',
        }).set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
      });

    it("Should product Index return status 200",async ()=>{
        const res = await request.get('/products');
        expect(res.status).toBe(200);
       
    });

    it("Should product Index return status 200",async ()=>{
        const res = await request.get('/products');
        expect(res.status).toBe(200);       
    });

    it('Should product Show return status 200', async () => {
        const res = await request.get(`/products/1`);
        expect(res.status).toBe(200);
      });

});


