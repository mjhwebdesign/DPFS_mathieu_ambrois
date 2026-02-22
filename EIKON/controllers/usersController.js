const { IncomingForm } = require("formidable");
const bcrypt = require("bcrypt");
//const fs = require("fs");
const path = require("path");
const userModel = require("../models/userModel");

const usersController = {
 /*index: function (req, res, next) {
  return res.render("users/userList");
 },*/

 /*===============
CREATE METHODE
===============*/
 create: function (req, res, next) {
  return res.render("users/userLogin-userRegister");
 },
 /*===============
STORE METHODE
===============*/
 store: function (req, res, next) {
  const form = new IncomingForm({
   uploadDir: path.join(__dirname, "../public/images/users"),
   keepExtensions: true,
   multiples: true,
  });

  // Formidabel parse the form
  form.parse(req, (err, fields, files) => {
   if (err) {
    console.error(err);
    return res.status(500).send("Error de Carga");
   }

   //  Files upload

   const avatar = files.avatar
    ? "/images/users/" + path.basename(files.avatar[0].filepath)
    : "";

   const encryptPassword = bcrypt.hashSync(fields["passwordRegister"][0], 10);

   const newUser = {
    firstName: fields["firstName"][0],
    lastName: fields["lastName"][0],
    email: fields["email-register"][0],
    role: "client",
    password: encryptPassword,
    avatar,
   };

   userModel.create(newUser);

   // Redirect after creation
   res.redirect("/");
  });
 },
};

module.exports = usersController;
