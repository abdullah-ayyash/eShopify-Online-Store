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

-- Queries for adding demo products

INSERT INTO categories (name) VALUES ('Watches');
INSERT INTO categories (name) VALUES ('Bands');
INSERT INTO categories (name) VALUES ('Bracelets');


-- Add products to the "products" table
INSERT INTO products (name, price, description, category_id) VALUES
  ('Classic Chronograph Watch', 149.99, 'A stylish classic chronograph watch with leather strap.', 1),
  ('Sporty Diver Watch', 179.99, 'A sporty diver watch with water resistance up to 100 meters.', 1),
  ('Elegant Dress Watch', 199.99, 'An elegant dress watch with stainless steel case and leather band.', 1),
  ('Smart Fitness Watch', 129.99, 'A smart fitness watch with heart rate monitoring and activity tracking.', 1),
  ('Vintage Mechanical Watch', 249.99, 'A vintage mechanical watch with exposed gears and genuine leather strap.', 1);

-- Add cross-reference entries to the "products_categories" table
INSERT INTO products_categories (product_id, category_id) VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 1);

