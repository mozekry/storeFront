import supertest from 'supertest';
import app from '../server';
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';


const request = supertest(app);
dotenv.config();

const { TOKEN_SECRET } = process.env;

let token: string, userId:number

describe('User Routes', () => {

    it('Should Create User return status 200', async () => {
        const res = await request.post('/users').send({
            firstname: 'Test1',
            lastname: 'test1',
            password: '1234',
          });
    
        const { body, status } = res;
        token = body;
        const  decodedToken  = jwt.verify(token.toString(), TOKEN_SECRET != undefined ? TOKEN_SECRET : '') as JwtPayload;
        userId = decodedToken.user.id;
        expect(status).toBe(200);
      });

      it('Should Users Index return status 200', async () => {
        const res = await request.get('/users').send().set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
      });

      it('Should Users Show return status 200', async () => {
        const res = await request.get(`/users/${userId}`).send().set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
      });

});
