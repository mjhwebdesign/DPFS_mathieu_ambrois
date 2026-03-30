module.exports = function (sequelize, dataTypes) {
 let alias = "Product";

 let cols = {
  product_id: {
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
  cover_image: {
   type: dataTypes.STRING,
  },
  secundary_image: {
   type: dataTypes.STRING,
  },
  category_id: {
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
   foreignKey: "category_id",
  });

  Product.belongsToMany(models.Theme, {
   as: "themes",
   through: "Product_Theme",
   foreignKey: "product_id",
   otherKey: "theme_id",
   timestamps: false,
  });

  Product.belongsToMany(models.Space, {
   as: "spaces",
   through: "Product_Space",
   foreignKey: "product_id",
   otherKey: "space_id",
   timestamps: false,
  });

  Product.belongsToMany(models.Cart, {
   as: "carts",
   through: "Cart_Detail",
   foreignKey: "product_id",
   otherKey: "cart_id",
   timestamps: false,
  });
 };

 return Product;
};
