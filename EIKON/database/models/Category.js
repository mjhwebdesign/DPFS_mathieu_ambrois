module.exports = function (sequelize, dataTypes) {
 let alias = "Category";

 let cols = {
  category_id: {
   autoIncrement: true,
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  category: {
   type: dataTypes.STRING,
   allowNull: false,
  },
 };

 let config = {
  tableName: "Category",
  timestamps: true,
  underscored: true,
 };

 const Category = sequelize.define(alias, cols, config);

 Category.associate = function (models) {
  Category.hasMany(models.Product, {
   as: "products",
   foreignKey: "category_id",
  });
 };

 return Category;
};
