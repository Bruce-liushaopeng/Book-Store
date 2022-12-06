//import postgreSql module from npm
const pgtools = require("pgtools"); //library for drop or create database
const pw = "Lsp75908635" // change to your own Password
let dbName = "bookstore5"
const config = {
  user: "postgres",
  password: pw, //type your own database passoword here
  port: 5432,
  host: "localhost",
};

pgtools.createdb(config, dbName, function (err, res) {
  if (err) {
    console.log(err);
  }
  //wait for result come back
  if (res) {
    console.log("Finish create bookstore");
  } else {
    console.log("something went wrong when creating DB");
  }
});

module.exports = { dbName, pw }
