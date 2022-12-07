//import postgreSql module from npm
let query = require("./database-initialize-variables.js");
// made a client object for establish connection
const {client} = require("./db")

let initialize = async() => {

  await client.query(query.dropTable, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("table delete success")
  }})

  await client.query(query.createTable, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("table create success")
    }})

  await client.query(query.initialDataQuery, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("initial data success")
  }})

  await client.query(query.initialFunctionQuery, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("initial function success")
  }})

  await client.query(query.initialTriggerQuery, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("inital trigger success")
  }})
}

initialize()