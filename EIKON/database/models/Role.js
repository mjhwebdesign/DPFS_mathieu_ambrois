module.exports = function (sequelize, dataTypes) {
 let alias = "Role";

 let cols = {
  role_id: {
   autoIncrement: true,
   primaryKey: true,
   type: dataTypes.INTEGER,
  },
  role: {
   type: dataTypes.STRING,
   allowNull: false,
  },
 };

 let config = {
  tableName: "Role",
  timestamps: true,
  underscored: true,
 };

 const Role = sequelize.define(alias, cols, config);

 Role.associate = function (models) {
  Role.hasMany(models.User, {
   as: "users",
   foreignKey: "role_id",
  });
 };

 return Role;
};
