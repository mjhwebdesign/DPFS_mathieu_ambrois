module.exports = function (sequelize, dataTypes) {
 let alias = "Cart";

 let cols = {
  cart_id: {
   autoIncrement: true,
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  user_id: {
   type: dataTypes.INTEGER,
   allowNull: false,
  },
  date_creation: {
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
   foreignKey: "user_id",
  });

  Cart.belongsToMany(models.Product, {
   as: "products",
   through: "Cart_Detail",
   foreignKey: "cart_id",
   otherKey: "product_id",
   timestamps: false,
  });
 };

 return Cart;
};
