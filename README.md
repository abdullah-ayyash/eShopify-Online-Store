# ShopNex - Your Next-Gen Online Store Web App (PERN Stack)

Welcome to ShopNex, a cutting-edge online store web application built using the PERN (PostgreSQL, Express.js, React.js, Node.js) stack. ShopNex aims to provide an exceptional shopping experience for customers while offering a seamless platform for merchants to manage their online businesses. Whether you're a small boutique owner or an aspiring entrepreneur, ShopNex equips you with the tools needed to succeed in the competitive e-commerce landscape.

## Key Features

- **Dynamic and Interactive Frontend:** Enjoy a smooth and engaging shopping experience with our dynamic React.js-based user interface.

- **Secure User Authentication:** ShopNex prioritizes security with robust user authentication mechanisms for both customers and merchants.

- **Effortless Product Management:** As a merchant, easily manage your product catalog, organize products into categories, and monitor inventory levels.

- **Real-time Shopping Cart:** Customer shopping carts update in real-time, ensuring a seamless and dynamic shopping experience.

- **Order Tracking and History:** Customers can easily track the status of their orders and access their order history.


## Tech Stack

- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Payment Integration:** Credit Card
- **Hosting:** AWS, Heroku

## Getting Started

To run ShopNex locally, follow these steps:

1. Clone the repository:
```javascript
git clone https://github.com/abdullah-ayyash/eShopify-Online-Store.git
cd shopnex
```
2. Install dependencies for the frontend and backend:
```javascript
cd frontend
npm install
cd ../backend
npm install
```

3. Configure the environment variables:

Create a `.env` file in the `backend` directory and add the required environment variables for your database connection and payment gateway API keys.

4. Set up the database:

Ensure you have PostgreSQL installed and create a database for ShopNex. Then, run the database migrations:
```javascript
cd backend
npx knex migrate:latest
```

5. Start the development servers:

```javascript
cd frontend
npm start
cd ../backend
npm start
```

6. Visit `http://localhost:3000` in your web browser to access the ShopNex application.

## Deployment

To deploy ShopNex to a production environment, follow the deployment instructions specific to your chosen hosting platform (AWS, Heroku, etc.). Remember to set the appropriate environment variables for the production environment.

## Contribution

We welcome contributions from the open-source community. If you find any issues or want to suggest enhancements, please create a pull request or open an issue in the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of this license.

---

Thank you for choosing ShopNex! We hope our online store web application enhances your business and delights your customers. If you have any questions or need assistance, please don't hesitate to reach out. Happy selling!
