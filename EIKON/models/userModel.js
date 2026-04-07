const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");
let db = require("../database/models");

const userModel = {
 // Get all users
 getAll: async function () {
  return await db.User.findAll({
   include: ["role"], // Incluye tablas relacionadas (falta cart)
  });
 },

 // Find a user by id
 findById: async function (id) {
  return await db.User.findByPk(id, {
   include: ["role"],
  });
 },

 findByEmail: async function (email) {
  return await db.User.findOne({
   where: { email: email },
  });
 },

 // Create a new user
 create: async function (newUser) {
  return await db.User.create(newUser);
 },

 // Update an existing user
 update: async function (id, updatedData) {
  await db.User.update(updatedData, {
   where: { user_id: id },
  });

  return await db.User.findByPk(id);
 },

 // Delete an existing user
 delete: async function (id) {
  return await db.User.destroy({
   where: { user_id: id },
  });
 },
};

module.exports = userModel;
