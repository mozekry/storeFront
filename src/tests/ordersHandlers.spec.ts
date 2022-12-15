import supertest from 'supertest';
import app from '../server';
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';

const request = supertest(app);
const { TOKEN_SECRET } = process.env;

describe('Orders Routes', () => {
    let token: string, userId:number

    beforeAll(async () => {
        const res = await request.post('/users').send({
            firstname: 'Test1',
            lastname: 'test1',
            password: '1234',
          });
        const { body, status } = res;
        token = body;
        const  decodedToken  = jwt.verify(token.toString(), TOKEN_SECRET != undefined ? TOKEN_SECRET : '') as JwtPayload;
        userId = decodedToken.user.id;
      });

      it('Should Create Order return status 200', async () => {
        const res = await request
          .post('/orders')
          .send({
            name: 'Order1',
            status: 'Active',
            user_id: userId,
        }).set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
      });

      it('Should Order Index return status 200', async () => {
        const res = await request
          .get('/orders').set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
      });



});