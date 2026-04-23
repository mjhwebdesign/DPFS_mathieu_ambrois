module.exports = function (sequelize, dataTypes) {
 let alias = "ProductTheme";

 let cols = {
  product_id: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  theme_id: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
 };

 let config = {
  tableName: "Product_Theme",
  //timestamps: true,
  timestamps: false,
  underscored: true,
 };

 const ProductTheme = sequelize.define(alias, cols, config);
 return ProductTheme;
};
