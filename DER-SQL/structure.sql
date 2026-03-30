/* 
DB
*/

CREATE DATABASE  IF NOT EXISTS `eikon_db`;
USE `eikon_db`;

/* 
ROLE
*/

DROP TABLE IF EXISTS Role;
CREATE TABLE Role (
  `role_id` int NOT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role` (`role`)
);

/* 
USER
*/

DROP TABLE IF EXISTS User;
CREATE TABLE User (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `user_ibfk_1` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) 
    REFERENCES `role` (`role_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

/* 
CATEGORY
*/

DROP TABLE IF EXISTS Category;
CREATE TABLE Category (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category` (`category`)
);

/* 
THEME
*/

DROP TABLE IF EXISTS Theme;
CREATE TABLE Theme (
  `theme_id` int NOT NULL AUTO_INCREMENT,
  `theme` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`theme_id`),
  UNIQUE KEY `theme` (`theme`)
);

/* 
SPACE
*/

DROP TABLE IF EXISTS Space;
CREATE TABLE Space (
  `space_id` int NOT NULL AUTO_INCREMENT,
  `space` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`space_id`),
  UNIQUE KEY `space` (`space`)
);

/* 
PRODUCT
*/

DROP TABLE IF EXISTS Product;
CREATE TABLE Product (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `secundary_image` varchar(255) DEFAULT NULL,
  `category_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `categoryID` (`category_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) 
    REFERENCES `category` (`category_id`) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);

/* 
PRODUCT_THEME
*/

DROP TABLE IF EXISTS Product_Theme;
CREATE TABLE Product_Theme (
  `product_id` int NOT NULL,
  `theme_id` int NOT NULL,
  PRIMARY KEY (`product_id`,`theme_id`),
  KEY `themeID` (`theme_id`),
  CONSTRAINT `product_theme_ibfk_1` FOREIGN KEY (`product_id`) 
    REFERENCES `product` (`product_id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT `product_theme_ibfk_2` FOREIGN KEY (`theme_id`) 
    REFERENCES `theme` (`theme_id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

/* 
PRODUCT_SPACE
*/

DROP TABLE IF EXISTS Product_Space;
CREATE TABLE Product_Space (
  `product_id` int NOT NULL,
  `space_id` int NOT NULL,
  PRIMARY KEY (`product_id`,`space_id`),
  KEY `spaceID` (`space_id`),
  CONSTRAINT `product_space_ibfk_1` FOREIGN KEY (`product_id`) 
    REFERENCES `product` (`product_id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT `product_space_ibfk_2` FOREIGN KEY (`space_id`) 
    REFERENCES `space` (`space_id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

/* 
CART
*/

DROP TABLE IF EXISTS Cart;
CREATE TABLE Cart (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date_creation` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  KEY `userID` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) 
    REFERENCES `user` (`user_id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

/* 
CART DETAIL
*/

DROP TABLE IF EXISTS Cart_Detail;
CREATE TABLE Cart_Detail (
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `date_added` datetime NOT NULL,
  PRIMARY KEY (`cart_id`,`product_id`),
  KEY `productID` (`product_id`),
  CONSTRAINT `cart_detail_ibfk_1` FOREIGN KEY (`cart_id`) 
    REFERENCES `cart` (`cart_id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT `cart_detail_ibfk_2` FOREIGN KEY (`product_id`) 
  REFERENCES `product` (`product_id`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE
);