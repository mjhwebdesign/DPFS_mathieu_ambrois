module.exports = function (sequelize, dataTypes) {
 let alias = "Product";

 let cols = {
  productID: {
   autoIncrement: true,
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  title: {
   type: dataTypes.STRING,
   allowNull: false,
  },
  description: {
   type: dataTypes.TEXT,
  },
  price: {
   type: dataTypes.DECIMAL,
   allowNull: false,
  },
  coverImage: {
   type: dataTypes.STRING,
  },
  secundaryImage: {
   type: dataTypes.STRING,
  },
  categoryID: {
   type: dataTypes.INTEGER,
   allowNull: false,
  },
 };

 let config = {
  tableName: "Product",
  timestamps: true,
  underscored: true,
 };

 const Product = sequelize.define(alias, cols, config);

 Product.associate = function (models) {
  Product.belongsTo(models.Category, {
   as: "category",
   foreignKey: "categoryID",
  });

  Product.belongsToMany(models.Theme, {
   as: "themes",
   through: "Product_Theme",
   foreignKey: "productID",
   otherKey: "themeID",
   timestamps: false,
  });

  Product.belongsToMany(models.Space, {
   as: "spaces",
   through: "Product_Space",
   foreignKey: "productID",
   otherKey: "spaceID",
   timestamps: false,
  });

  Product.belongsToMany(models.Cart, {
   as: "carts",
   through: "Cart_Detail",
   foreignKey: "productID",
   otherKey: "cartID",
   timestamps: false,
  });
 };

 return Product;
};
