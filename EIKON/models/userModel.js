const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

const userModel = {
 // Get all users (fs to read , rewrite and deliver fresh data after all getAll() Call !! after Create update Delete )
 getAll: function () {
  const usersFile = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(usersFile);
 },

 // Find a user by id
 findById: function (id) {
  const users = this.getAll();
  return users.find((user) => user.id == id);
 },

 // Create a new user
 create: function (newUser) {
  const users = this.getAll();

  // Create an id
  const lastUser = users[users.length - 1];
  const newId = lastUser ? lastUser.id + 1 : 1;

  const userToSave = {
   id: newId,
   ...newUser,
  };

  users.push(userToSave);

  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  return userToSave;
 },

 // Update an existing user
 update: function (id, updatedData) {
  const users = this.getAll();

  const updatedUsers = users.map((user) => {
   if (user.id == id) {
    return {
     ...user,
     ...updatedData,
     id: user.id, // !! Make sure id doesn´t change
    };
   }
   return user;
  });

  fs.writeFileSync(usersFilePath, JSON.stringify(updatedUsers, null, 2));
 },

 // Delete an existing user
 delete: function (id) {
  // Load clean product list
  const users = this.getAll();
  //Keep in filteredUsers all users except the one selected by id
  const filteredUsers = users.filter((user) => user.id != id);
  // Overwrite json with filteredProducts
  fs.writeFileSync(usersFilePath, JSON.stringify(filteredUsers, null, 2));

  return true;
 },
};

module.exports = userModel;
