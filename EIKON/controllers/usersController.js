const { IncomingForm } = require("formidable");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const crypto = require("crypto");

const usersController = {
 /*===============
CREATE METHODE*/

 create: function (req, res, next) {
  return res.render("users/userLogin-userRegister", {
   errors: {},
   oldData: {},
   formType: {},
  });
 },
 /*===============
STORE METHODE*/

 store: function (req, res, next) {
  const errors = validationResult(req);

  // Fn to Delete files if register failed
  const deleteUploadedFiles = () => {
   if (!req.files) return;
   Object.values(req.files).forEach((file) => {
    const f = Array.isArray(file) ? file[0] : file;
    if (f && f.filepath && fs.existsSync(f.filepath)) {
     fs.unlinkSync(f.filepath);
    }
   });
  };

  if (!errors.isEmpty()) {
   deleteUploadedFiles();
   return res.render("users/userLogin-userRegister", {
    errors: errors.mapped(),
    oldData: req.body,
    formType: "register",
   });
  }

  try {
   // HASH PASSWORD
   const hashedPassword = bcrypt.hashSync(req.body.password, 10);

   // AVATAR
   const file = Array.isArray(req.files.avatar)
    ? req.files.avatar[0]
    : req.files.avatar;

   const avatar = "/images/users/" + path.basename(file.filepath);

   // CREATE USER
   const newUser = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    avatar,
    role_id: 2,
   };

   userModel.create(newUser);

   return res.redirect("/");
  } catch (error) {
   console.error("STORE ERROR:", error);
   deleteUploadedFiles();
   return res.status(500).send("Error al crear usuario");
  }
 },

 /*===============
login METHODE*/

 login: async function (req, res, next) {
  console.log("SESSION AVANT LOGIN:", req.session);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
   return res.render("users/userLogin-userRegister", {
    errors: errors.mapped(),
    oldData: req.body,
    formType: "login",
   });
  }

  try {
   const { emailLogin, password, remember } = req.body;

   const user = await userModel.findByEmail(emailLogin);

   // doble check
   if (!user) {
    return res.render("users/userLogin-userRegister", {
     errors: {
      emailLogin: { msg: "El usuario no existe" },
     },
     oldData: req.body,
     formType: "login",
    });
   }

   req.session.user = {
    id: user.user_id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    avatar: user.avatar,
    role: user.role_id,
   };

   // RECORDAR USUARIO
   if (remember) {
    const token = crypto.randomBytes(64).toString("hex");

    await userModel.update(user.user_id, { rememberToken: token });

    res.cookie("rememberToken", token, {
     maxAge: 7 * 24 * 60 * 60 * 1000,
     httpOnly: true,
    });
   }

   console.log("SESSION APRES LOGIN:", req.session);

   return res.redirect("/");
  } catch (error) {
   console.error("LOGIN ERROR:", error);
   return res.status(500).send("Error en login");
  }
 },
 /*===============
logout METHODE & (destroy session)*/

 logout: async function (req, res) {
  //Remove Session Token if logout
  if (req.session.user) {
   await userModel.update(req.session.user.user_id, {
    rememberToken: null,
   });
  }
  //Clear Token Cookie if logout
  res.clearCookie("rememberToken");
  req.session.destroy(() => {
   res.redirect("/");
  });
 },

 /*===============
SHOW METHODE*/

 show: async function (req, res, next) {
  //Get the id from the url
  const id = parseInt(req.params.id);
  // Retrieve a specific user using the method in the Model previously created
  const user = await userModel.findById(id);

  if (!user) {
   return res.status(404).send("Usuario no existe");
  }
  // Send specific product to the view
  return res.render("users/userDetail", { user });
 },

 /*===============
EDIT METHODE*/

 edit: async function (req, res) {
  const id = req.params.id;
  const user = await userModel.findById(id);

  if (!user) {
   return res.status(404).send("Usuario no existe");
  }
  // Load Pre filled Form
  res.render("users/userEdit", { user, errors: {}, oldData: {} });
 },

 /*===============
Update METHODE*/

 update: async function (req, res) {
  const errors = validationResult(req);

  const deleteUploadedFiles = () => {
   if (!req.files) return;

   Object.values(req.files).forEach((file) => {
    const f = Array.isArray(file) ? file[0] : file;
    if (f && f.filepath && fs.existsSync(f.filepath)) {
     fs.unlinkSync(f.filepath);
    }
   });
  };

  if (!errors.isEmpty()) {
   deleteUploadedFiles();

   //  User existente (await)
   const user = await userModel.findById(req.params.id);

   return res.render("users/userEdit", {
    user,
    errors: errors.mapped(),
    oldData: req.body,
   });
  }

  try {
   const id = req.params.id;
   const fields = req.body;
   const files = req.files;

   const existingUser = await userModel.findById(id);

   //  IMAGES
   let avatar = existingUser.avatar;

   // If new avatar image is load
   if (files.avatar) {
    const file = Array.isArray(files.avatar) ? files.avatar[0] : files.avatar;

    if (file.size > 0) {
     // Delete old image
     if (existingUser.avatar) {
      const oldPath = path.join(__dirname, "../public", existingUser.avatar);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
     }

     avatar = "/images/users/" + path.basename(file.filepath);
    }
   }

   //  UPDATE User
   await userModel.update(id, {
    first_name: fields["firstName"],
    last_name: fields["lastName"],
    email: fields["email"],
    avatar,
   });

   const updatedUser = await userModel.findById(id);

   return res.redirect("/users/" + id);
  } catch (error) {
   console.error(error);
   deleteUploadedFiles();
   return res.status(500).send("Error actualizando Usuario");
  }
 },

 /*===============
DESTROY METHODE*/

 destroy: async function (req, res) {
  const id = req.params.id;

  const user = await userModel.findById(id);

  if (!user) {
   return res.status(404).send("Usuario no encontrado");
  }

  //  Delete Avatar
  if (user.avatar) {
   const avatarPath = path.join(__dirname, "../public", user.avatar);

   if (fs.existsSync(avatarPath)) {
    fs.unlinkSync(avatarPath);
   }
  }

  await userModel.delete(id);
  //Redirect
  res.redirect("/admin");
 },
};

module.exports = usersController;
