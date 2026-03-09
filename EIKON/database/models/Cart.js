module.exports = function (sequelize, dataTypes) {
 let alias = "Cart";

 let cols = {
  cartID: {
   autoIncrement: true,
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  userID: {
   type: dataTypes.INTEGER,
   allowNull: false,
  },
  dateCreation: {
   type: dataTypes.DATE,
   allowNull: false,
  },
 };

 let config = {
  tableName: "Cart",
  timestamps: true,
  underscored: true,
 };

 const Cart = sequelize.define(alias, cols, config);

 Cart.associate = function (models) {
  Cart.belongsTo(models.User, {
   as: "user",
   foreignKey: "userID",
  });

  Cart.belongsToMany(models.Product, {
   as: "products",
   through: "Cart_Detail",
   foreignKey: "cartID",
   otherKey: "productID",
   timestamps: false,
  });
 };

 return Cart;
};
