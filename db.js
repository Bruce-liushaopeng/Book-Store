const {Client} = require('pg')
const {pw, databaseName} = require('./database-initialize-variables')

const client = new Client({
    user: "postgres",
    password: pw, //type your own database passoword here
    port: 5432,
    host: "localhost",
    database: databaseName
  });

client.connect()

module.exports = {client}