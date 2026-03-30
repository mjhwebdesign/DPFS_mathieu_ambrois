module.exports = function (sequelize, dataTypes) {
 let alias = "Theme";

 let cols = {
  theme_id: {
   autoIncrement: true,
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  theme: {
   type: dataTypes.STRING,
   allowNull: false,
  },
 };

 let config = {
  tableName: "Theme",
  timestamps: true,
  underscored: true,
 };

 const Theme = sequelize.define(alias, cols, config);

 Theme.associate = function (models) {
  Theme.belongsToMany(models.Product, {
   as: "products",
   through: "Product_Theme",
   foreignKey: "theme_id",
   otherKey: "product_id",
   timestamps: false,
  });
 };

 return Theme;
};
