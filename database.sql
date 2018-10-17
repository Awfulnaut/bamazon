CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INTEGER(11) NOT NULL,
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
("Yuri on ICE!!! Blu-ray box set", "Entertainment", 20, 30),
("IKEA Lounge Chair", "Home", 179, 15),
("GTX 1080 Ti", "Electronics", 650, 20),
("Nintendo Switch", "Electronics", 300, 24),
("Cat Scratching pad", "Pet Supplies", 15, 22),
("Leesa Mattress", "Home", 850, 12),
("Ender's Game - Orson Scott Card", "Books", 7, 33),
("LG 4k Smart TV", "Entertainment", 375, 3),
("Arctis 7 Headphones", "Electronics", 150, 45),
("Nature's Miracle Clumping Litter", "Pet Supplies", 9, 42);

SELECT * FROM products;