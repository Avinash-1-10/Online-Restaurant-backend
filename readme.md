# Online Restaurant Service API

This is a simple REST API for a hypothetical online restaurant service. It allows users to manage products and place orders.

## Features

- Login and Register new user
- CRUD operations for products (Create, Read, Update, Delete)
- Place an order for a product
- List all orders

## Technologies Used

- Node.js
- MongoDB

## Frameworks and Libraries

- bcryptjs
- cors
- dotenv
- express
- mongoose
- nodemon

## Installation

1. **Clone the repository:**

```bash
   git clone <repository-url>
```

2. Navigate to the project directory

3. Install dependencies 
```bash
   npm install
```

4. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

- PORT = `<port number>`
- MONGO_URI = `<your_mongodb_uri>`

5. Start the server:
```bash
   npm run dev
```

## API Endpoints

### User

- **POST /user/register**: Register a new user.

  - Request body should contain the following fields:
    - `name`: Name of the user.
    - `email`: Email address of the user.
    - `password`: Password for the user account.

- **POST /user/login**: Login user.

  - Request body should contain the following fields:
    - `email`: Email address of the user.
    - `password`: Password for the user account.

- **GET /user**: Get all users.
  - Returns:
    - `200 OK` with an array of all users fetched successfully.
    - `500 Internal Server Error` if an error occurs while fetching users.

### Products

- **GET /products**: Get all products.

- **GET /products/:id**: Get a single product by ID.

- **POST /products**: Create a new product.

  - Request body should contain the following fields:
    - `name`: Name of the product.
    - `price`: Price of the product.
    - `image`: URL of the product image.
    - `owner`: ID of the user who owns the product.

- **PUT /products/:id**: Update a product by ID.

  - Request body should contain the following fields:
    - `name` (optional): Updated name of the product.
    - `price` (optional): Updated price of the product.
    - `image` (optional): Updated URL of the product image.

- **DELETE /products/:id**: Delete a product by ID.

### Orders

- **GET /orders**: Get all orders.

- **GET /orders/:id**: Get a single order by ID.

- **POST /orders**: Place a new order.
  - Request body should contain the following fields:
    - `user`: ID of the user placing the order.
    - `product`: ID of the product being ordered.
    - `quantity`: Quantity of the product being ordered.
