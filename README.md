This project contains End-Points for Store Front application

>End-point URLs >> 
Users Handler:
Request URL: GET /users >> get all users [token required]
Request URL: GET /users/:id >> get certain user [token required] 
Request URL: POST /users >> Create new user 
Request URL: POST /users/login >> get token 

Products Handler:
Request URL: GET /products >> get all products
Request URL: GET /products/:id >> get certain product 
Request URL: POST /products >> Create new Product [token required]
Request URL: GET /productsbycategory >> get products by category [token required]
Request URL: GET /products/popular >> get popular products [token required]

Orders Handler:
Request URL: GET /orders >> get all Orders 
Request URL: POST /orders >> Create new Order
Request URL: GET /orders/:id/products >> get Order by ID 
Request URL: GET /orders/users/:userid >> get orders for a certain user [token required]
Request URL: GET /orders/complete/users/:userid >> get completed Orders for a certain user [token required]


>used scripts:
    >1- npm run prettier >> apply prettier configurations 
    >2- npm run start >> start localhost server 

