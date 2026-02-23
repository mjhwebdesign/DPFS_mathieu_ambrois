const { IncomingForm } = require("formidable");
const bcrypt = require("bcrypt");
//const fs = require("fs");
const path = require("path");
const userModel = require("../models/userModel");
const crypto = require("crypto");

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

   if (userModel.findByEmail(fields["email-register"][0])) {
    return res.send("El email ya existe!");
   }
   userModel.create(newUser);

   // Redirect after creation
   res.redirect("/");
  });
 },

 /*===============
login METHODE
===============*/
 login: function (req, res, next) {
  const form = new IncomingForm({
   multiples: true,
  });
  form.parse(req, (err, fields) => {
   if (err) {
    return res.status(500).send("Error formulario");
   }
   const email = fields["email"][0];
   const password = fields["password"][0];
   const remember = fields["remember"][0];
   const user = userModel.findByEmail(email);

   if (!user) {
    return res.redirect("/login?error=Usuario no existe");
   }

   const isValidPassword = bcrypt.compareSync(password, user.password);

   if (!isValidPassword) {
    return res.redirect("/login?error=Clave incorrecta");
   }

   req.session.user = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
   };
   // Recordarme
   if (remember) {
    // Crear un token seguro usando Crypto
    const token = crypto.randomBytes(64).toString("hex");
    // Guardar el token en el Json o db
    userModel.update(user.id, { rememberToken: token });
    // Crear una cookie (7 dias)
    res.cookie("rememberToken", token, {
     maxAge: 7 * 24 * 60 * 60 * 1000,
     httpOnly: true,
    });
   }

   return res.redirect("/");
  });
 },
 /*===============
logout METHODE
===============*/
 logout: function (req, res) {
  //Remove Session Token if logout
  if (req.session.user) {
   userModel.update(req.session.user.id, {
    rememberToken: null,
   });
  }
  //Clear Token Cookie if logout
  res.clearCookie("rememberToken");
  req.session.destroy(() => {
   res.redirect("/");
  });
 },
};

module.exports = usersController;
