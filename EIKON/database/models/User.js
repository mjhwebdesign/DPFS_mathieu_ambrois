module.exports = function (sequelize, dataTypes) {
 let alias = "User";

 let cols = {
  userID: {
   autoIncrement: true,
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  firstName: {
   type: dataTypes.STRING,
   allowNull: false,
  },
  lastName: {
   type: dataTypes.STRING,
   allowNull: false,
  },
  email: {
   type: dataTypes.STRING,
   allowNull: false,
  },
  password: {
   type: dataTypes.STRING,
   allowNull: false,
  },
  avatar: {
   type: dataTypes.STRING,
  },
  roleID: {
   type: dataTypes.INTEGER,
   allowNull: false,
  },
 };

 let config = {
  tableName: "User",
  timestamps: true,
  underscored: true,
 };

 const User = sequelize.define(alias, cols, config);

 User.associate = function (models) {
  User.belongsTo(models.Role, {
   as: "role",
   foreignKey: "roleID",
  });

  User.hasMany(models.Cart, {
   as: "carts",
   foreignKey: "userID",
  });
 };

 return User;
};
