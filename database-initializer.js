//import postgreSql module from npm
const { Client } = require("pg"); //library for define/modify Tabele
let query = require("./database-initialize-variables.js");
let {dbName, pw} = require("./database-initialize-variables");
// made a client object for establish connection
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: pw, //type your own database passoword here
  database: dbName,
});

client.connect();

let initialize = async() => {
  await client.query(query.createTable, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("table create success")
      console.log(res);
    }})
  
  await client.query(query.createTable, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("table create success")
      console.log(res);
    }}
    
  )
}

initialize()