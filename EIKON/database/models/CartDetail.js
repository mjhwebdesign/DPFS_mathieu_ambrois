module.exports = function (sequelize, dataTypes) {
 let alias = "CartDetail";

 let cols = {
  cart_id: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  product_id: {
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  quantity: {
   type: dataTypes.INTEGER,
   allowNull: false,
  },
  date_added: {
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
