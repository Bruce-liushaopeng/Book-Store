const {Client} = require('pg')
const initialSetup = require('./database-initialize-variables')

const client = new Client({
    user: "postgres",
    password: "Lsp75908635", //type your own database passoword here
    port: 5432,
    host: "localhost",
    database: 'BookStoreTest'
  });

client.connect()

// generate initail tables
client.query(initialSetup.createTable, (err, res) => {
  if (!err) {
    console.log("Table generated success");
  } else {
    console.log(err.message);
  }
  client.end;
})

// insert initial data
client.query(initialSetup.initialDataQuery, (err, res) => {
  if (!err) {
    console.log("Initial query insert success");
  } else {
    console.log(err.message);
  }
  client.end;
})