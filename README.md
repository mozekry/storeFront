This project contains End-Points for Store Front application

> Database installation:
- CREATE USER storefront_user WITH PASSWORD 'Pass@1234';
- CREATE DATABASE storefront_db
- CREATE DATABASE storefront_db_test
- GRANT ALL PRIVILEGES ON DATABASE storefront_db TO storefront_user;
- GRANT ALL PRIVILEGES ON DATABASE storefront_db_test TO storefront_user;

> Application Ports:
- Application Host >> http://localhost:3000/
- Database Host >> http://localhost:5432/

> Package Installation Instructions:
- use npm install to install all dependencies 

> used scripts:
- npm run prettier >> apply prettier configurations 
- npm run start >> start localhost server 
- npm run test >> run unite tests


> Environment Variables:
- POSTGRES_HOST = 127.0.0.1:5432
- POSTGRES_DB = storefront_db
- POSTGRES_DB_TEST = storefront_db_test
- POSTGRES_USER = storefront_user
- POSTGRES_PASSWORD = Pass@1234
- BCRYPT_PASSWORD = mySecretKey
- SALT_ROUNDS = 10
- TOKEN_SECRET = mySecretTOKEN!
- ENV = dev
