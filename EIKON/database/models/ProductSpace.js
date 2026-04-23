module.exports = function (sequelize, dataTypes) {
 let alias = "ProductSpace";

 let cols = {
  product_id: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  space_id: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
 };

 let config = {
  tableName: "Product_Space",
  //timestamps: true,
  timestamps: false,
  underscored: true,
 };

 const ProductSpace = sequelize.define(alias, cols, config);
 return ProductSpace;
};
