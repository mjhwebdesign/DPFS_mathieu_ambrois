module.exports = {
 development: {
  username: "root",
  password: "S1lv4g3r13n!",
  database: "eikon_db",
  host: "127.0.0.1",
  dialect: "mysql",
 },
 test: {
  username: "root",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
 },
 production: {
  username: "root",
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql",
 },
};
