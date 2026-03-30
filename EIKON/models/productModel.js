const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
let db = require("../database/models");

const productModel = {
 // Get all products
 getAll: async function () {
  return await db.Product.findAll({
   include: ["themes", "spaces", "category"], // Incluye tablas relacionadas (falta Cart)
   order: [["title", "ASC"]],
  });
 },

 // Find a product by id
 findById: async function (id) {
  return await db.Product.findByPk(id, {
   include: ["themes", "spaces", "category"],
  });
 },

 // Create a new Product

 create: async function (newProduct) {
  return await db.Product.create(newProduct);
 },

 //Update a Product
 update: async function (id, updatedData) {
  await db.Product.update(updatedData, {
   where: { product_id: id },
  });

  return await db.Product.findByPk(id);
 },

 // Delete a Product
 delete: async function (id) {
  return await db.Product.destroy({
   // Dependencias se borran tambien pq ON DELETE CASCADE en la DB
   where: { product_id: id },
  });
 },
};

module.exports = productModel;
