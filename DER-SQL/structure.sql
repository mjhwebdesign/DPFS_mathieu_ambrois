-- =========================================
DB
-- =========================================

CREATE DATABASE eikon_db;
USE eikon_db;

-- =========================================
ROLE
-- =========================================

CREATE TABLE Role (
    roleID INT AUTO_INCREMENT,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (roleID),
    UNIQUE (role)
);

-- =========================================
USER
-- =========================================

CREATE TABLE User (
    userID INT AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    roleID INT NOT NULL,
    PRIMARY KEY (userID),
    UNIQUE (email),
    FOREIGN KEY (roleID)
        REFERENCES Role(roleID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- =========================================
CATEGORY
-- =========================================

CREATE TABLE Category (
    categoryID INT AUTO_INCREMENT,
    category VARCHAR(100) NOT NULL,
    PRIMARY KEY (categoryID),
    UNIQUE (category)
);

-- =========================================
 THEME
-- =========================================

CREATE TABLE Theme (
    themeID INT AUTO_INCREMENT,
    theme VARCHAR(100) NOT NULL,
    PRIMARY KEY (themeID),
    UNIQUE (theme)
);

-- =========================================
SPACE
-- =========================================

CREATE TABLE Space (
    spaceID INT AUTO_INCREMENT,
    space VARCHAR(100) NOT NULL,
    PRIMARY KEY (spaceID),
    UNIQUE (space)
);

-- =========================================
PRODUCT
-- =========================================

CREATE TABLE Product (
    productID INT AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    coverImage VARCHAR(255),
    secundaryImage VARCHAR(255),
    categoryID INT NOT NULL,
    PRIMARY KEY (productID),
    FOREIGN KEY (categoryID)
        REFERENCES Category(categoryID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- =========================================
PRODUCT_THEME
-- =========================================

CREATE TABLE Product_Theme (
    productID INT NOT NULL,
    themeID INT NOT NULL,
    PRIMARY KEY (productID, themeID),
    FOREIGN KEY (productID)
        REFERENCES Product(productID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (themeID)
        REFERENCES Theme(themeID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =========================================
PRODUCT_SPACE
-- =========================================

CREATE TABLE Product_Space (
    productID INT NOT NULL,
    spaceID INT NOT NULL,
    PRIMARY KEY (productID, spaceID),
    FOREIGN KEY (productID)
        REFERENCES Product(productID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (spaceID)
        REFERENCES Space(spaceID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =========================================
CART
-- =========================================

CREATE TABLE Cart (
    cartID INT AUTO_INCREMENT,
    userID INT NOT NULL,
    dateCreation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cartID),
    FOREIGN KEY (userID)
        REFERENCES User(userID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =========================================
CART_DETAIL
-- =========================================

CREATE TABLE Cart_Detail (
    cartID INT NOT NULL,
    productID INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    dateAdded DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cartID, productID),
    FOREIGN KEY (cartID)
        REFERENCES Cart(cartID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (productID)
        REFERENCES Product(productID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);