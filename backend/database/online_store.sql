-- Users Table:
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- products Table:
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    description TEXT,
    category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE
);

-- categories Table:
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- cart_items Table:
CREATE TABLE cart_items (
    item_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);


-- Cross REFERENCE tables 
CREATE TABLE products_categories (
    product_id INTEGER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

CREATE TABLE users_cart_items (
  user_id INTEGER NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products (product_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, product_id)
);