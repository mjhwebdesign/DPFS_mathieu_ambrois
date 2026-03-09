module.exports = function (sequelize, dataTypes) {
 let alias = "CartDetail";

 let cols = {
  cartID: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  productID: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  quantity: {
   type: dataTypes.INTEGER,
   allowNull: false,
  },
  dateAdded: {
   type: dataTypes.DATE,
   allowNull: false,
  },
 };

 let config = {
  tableName: "Cart_Detail",
  timestamps: true,
  underscored: true,
 };

 const CartDetail = sequelize.define(alias, cols, config);
 return CartDetail;
};
