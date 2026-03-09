module.exports = function (sequelize, dataTypes) {
 let alias = "Space";

 let cols = {
  spaceID: {
   autoIncrement: true,
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  space: {
   type: dataTypes.STRING,
   allowNull: false,
  },
 };

 let config = {
  tableName: "Space",
  timestamps: true,
  underscored: true,
 };

 const Space = sequelize.define(alias, cols, config);

 Space.associate = function (models) {
  Space.belongsToMany(models.Product, {
   as: "products",
   through: "Product_Space",
   foreignKey: "spaceID",
   otherKey: "productID",
   timestamps: false,
  });
 };

 return Space;
};
