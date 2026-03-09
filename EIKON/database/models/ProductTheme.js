module.exports = function (sequelize, dataTypes) {
 let alias = "ProductTheme";

 let cols = {
  productID: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  themeID: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
 };

 let config = {
  tableName: "Product_Theme",
  timestamps: true,
  underscored: true,
 };

 const ProductTheme = sequelize.define(alias, cols, config);
 return ProductTheme;
};
