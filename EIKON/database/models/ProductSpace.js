module.exports = function (sequelize, dataTypes) {
 let alias = "ProductSpace";

 let cols = {
  productID: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  spaceID: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
 };

 let config = {
  tableName: "Product_Space",
  timestamps: true,
  underscored: true,
 };

 const ProductSpace = sequelize.define(alias, cols, config);
 return ProductSpace;
};
