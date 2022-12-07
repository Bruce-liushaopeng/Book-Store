//import postgreSql module from npm
const pgtools = require("pgtools"); //library for drop or create database
const {pw, databaseName} = require("./database-initialize-variables") // change to your own Password
const config = {
  user: "postgres",
  password: pw, //type your own database passoword here
  port: 5432,
  host: "localhost",
};

pgtools.createdb(config, databaseName, function (err, res) {
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

