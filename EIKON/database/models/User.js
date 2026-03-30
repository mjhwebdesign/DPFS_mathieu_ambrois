module.exports = function (sequelize, dataTypes) {
 let alias = "User";

 let cols = {
  user_id: {
   autoIncrement: true,
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  first_name: {
   type: dataTypes.STRING,
   allowNull: false,
  },
  last_name: {
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
  role_id: {
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
   foreignKey: "role_id",
  });

  User.hasMany(models.Cart, {
   as: "carts",
   foreignKey: "user_id",
  });
 };

 return User;
};
