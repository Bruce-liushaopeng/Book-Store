//import require module
const express = require("express");
const fs = require("fs");
const logger = require("morgan");
const path = require("path");
const { Client } = require("pg");

// Start express app
const app = express();
//use morgan to show the request type
app.use(logger("dev"));
//locate the file dirctory
app.use(express.static("public"));
//convert request body to json
app.use(express.json());

// made a client object for establish connection
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "107499538", //type your own database passoword
  database: "bookstore",
});
//connect to the databse
client.connect();

//basic test
//select all book in database
client.query(`Select * From Book`, (err, res) => {
  if (err) console.log(err);
  else console.log(res.rows);
  client.end(); //close the client
  //don't close until server shut down when the project is finish
  //here is just for testing
});
