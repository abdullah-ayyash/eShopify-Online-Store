-- Users Table:
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  fullname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- categories Table:
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


-- products Table:
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    description TEXT,
    category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE
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
  item_id INTEGER NOT NULL REFERENCES cart_items (item_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, item_id)
);

CREATE TABLE shipping_details (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  address VARCHAR(150) NOT NULL UNIQUE,
  country VARCHAR(50) NOT NULL,
  postal_code VARCHAR(25) NOT NULL,
  city VARCHAR(25) NOT NULL,
  provance VARCHAR(50) NOT NULL
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount NUMERIC NOT NULL,
  status VARCHAR(50) NOT NULL,
  shipping_address TEXT NOT NULL
);

-- cross reference table 
CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  subtotal NUMERIC NOT NULL,
  PRIMARY KEY (order_id, product_id)
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

INSERT INTO products (name, price, description, category_id)
VALUES
  ('Premium Leather Watch Band', 39.99, 'Handcrafted genuine leather watch band with stitching detail.', 2),
  ('Stainless Steel Bracelet Watch Band', 49.99, 'Elegant stainless steel bracelet watch band with butterfly clasp.', 2),
  ('Sport Silicone Watch Band', 29.99, 'Durable and comfortable silicone watch band designed for sports activities.', 2),
  ('Nylon NATO Watch Strap', 19.99, 'Classic NATO-style nylon watch strap in various colors.', 2),
  ('Milanese Loop Metal Watch Band', 59.99, 'Stylish and adjustable metal mesh watch band with magnetic closure.', 2);

INSERT INTO products_categories (product_id, category_id)
VALUES
  (LASTVAL() - 4, 2),
  (LASTVAL() - 3, 2),
  (LASTVAL() - 2, 2),
  (LASTVAL() - 1, 2),
  (LASTVAL(), 2);
  

-- Insert bracelets products
INSERT INTO products (name, price, description, category_id)
VALUES
  ('Elegant Silver Bracelet', 29.99, 'A stunning silver bracelet with intricate designs.', 3),
  ('Rose Gold Charm Bracelet', 39.99, 'A beautiful rose gold charm bracelet with various charms.', 3),
  ('Leather Wrap Bracelet', 24.99, 'A stylish leather wrap bracelet with a buckle closure.', 3),
  ('Pearl Beaded Bracelet', 19.99, 'A classic pearl beaded bracelet with a silver clasp.', 3),
  ('Bohemian Tassel Bracelet', 14.99, 'A bohemian-style tassel bracelet with colorful beads.', 3);

-- Insert products_categories
INSERT INTO products_categories (product_id, category_id)
VALUES
  (LASTVAL() - 4, 3), -- Elegant Silver Bracelet
  (LASTVAL() - 3, 3), -- Rose Gold Charm Bracelet
  (LASTVAL() - 2, 3), -- Leather Wrap Bracelet
  (LASTVAL() - 1, 3), -- Pearl Beaded Bracelet
  (LASTVAL(), 3); -- Bohemian Tassel Bracelet


