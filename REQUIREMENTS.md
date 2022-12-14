# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### products
- id serial primary key,
- name varchar(100),
- price integer not null,
- category varchar(100) null

#### users
- id serial primary key,
- firstName varchar(100),
- lastName varchar(100),
- password varchar(255)

#### orders
-  id serial primary key,
- name varchar(100) NULL
- user_id BIGINT REFERENCES users(id),
- status varchar(100), status of order (active or complete)

#### order_products
- id serial primary key,
- quantity integer,
- order_id bigint references orders(id),
- product_id bigint references products(id)

# End-point URLs:
> Users Handler:
- Request URL: GET /users >> get all users [token required]
- Request URL: GET /users/:id >> get certain user [token required] 
- Request URL: POST /users >> Create new user 
- Request URL: POST /users/login >> get token 

> Products Handler:
- Request URL: GET /products >> get all products
- Request URL: GET /products/:id >> get certain product 
- Request URL: POST /products >> Create new Product [token required]
- Request URL: GET /productsbycategory >> get products by category [token required]
- Request URL: GET /products/popular >> get popular products [token required]

> Orders Handler:
- Request URL: GET /orders >> get all Orders 
- Request URL: POST /orders >> Create new Order
- Request URL: GET /orders/:id/products >> get Order by ID 
- Request URL: GET /orders/users/:userid >> get orders for a certain user [token required]
- Request URL: GET /orders/complete/users/:userid >> get completed Orders for a certain user [token required]