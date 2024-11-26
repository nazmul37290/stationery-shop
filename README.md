# Stationery Shop
## live link : [https://stationery-shop-iota.vercel.app/](https://stationery-shop-iota.vercel.app/api/orders/revenue)

### Overview
This project is a Node.js-based server application deployed on Vercel. It is configured to handle API requests and dynamic routes efficiently using Express.js. The project includes a custom vercel.json file to ensure proper routing and deployment.

### Technology used
1. Node JS 
2. Express JS
3. Mongoose
4. Typescript

### libraries 
1. dotenv
2. cors
3. eslint
4. ts-node-dev

### Features 
1. creating products api
2. retrive all products api
3. retrive a single product api
4. update a product api
5. delete a product api
6. create order api
7. generate all order total revenue api
8. proper validation and error handling

## Running the server locally
### 1. clone the repo
   clone the repository to your local device using command prompt
   
### 2. Install the dependencies
   open the project file in code editor . then open terminal and run command `npm install`
   
### 3. Environmental variables
   Create a .env file in the root of the project 
   add the following variable according to your database 
```NODE_ENV= development
PORT= your port number
DATABASE_URL= your mongodb database url
```
### 4. Run the project
   At last run the command `npm run start:dev` to run locally 
   

## API endpoints
| Method | Endpoint | Description |
|----------|----------|----------|
| GET    | `/`     | Returns a welcome message     |
| GET    | `/api/products`     | Returns all products     |
| GET    | `/api/products/:productId`     | Returns single product     |
| GET    | `/api/orders/revenue`     | Returns the total revenue of all orders     |
| POST    | `/api/products`     | creates a product     |
| POST    | `/api/orders`     | creates a order     |
| PUT    | `/api/products/:productId`     | Updates a product     |
| DELETE    | `/api/products/:productId`     | Deletes a product     |

