DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ruger 10/22 Carbine", "Hunting and Outdoors", 199.99, 10);
VALUES ("Trucker's Friend All Purpose Survival Tool", "Hunting and Outdoors", 62.12, 10);
VALUES ("Gerber Suspension Multi-Plier", "Tools and Home Improvement", 26.84, 10);
VALUES ("Joe Rocket Ballistic Revolution", "Clothing and Apparel", 117.00, 10);
VALUES ("FREETOO Tactical Gloves", "Sports and Outdoors", 21.68, 10);
VALUES ("Motorcycle Riding Pants", "Automotive", 67.90, 10);
VALUES ("RAVPower 16W Solar Panel", "Cell Phones and Accessories", 51.99, 10);
VALUES ("Survivor Filter PRO", "Sports and Outdoors", 59.95, 10);
VALUES ("Dickies Escape Hiker Boots", "Clothing and Apparel", 69.99, 10);
VALUES ("ArcEnCiel 40L Camping Bag", "Sports and Outdoors", 59.98, 10);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
