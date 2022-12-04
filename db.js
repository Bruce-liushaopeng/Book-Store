const {Client} = require('pg')

const client = new Client({
    user: "postgres",
    password: "Lsp75908635", //type your own database passoword here
    port: 5432,
    host: "localhost",
    database: 'BookStoreTest'
  });

client.connect()

module.exports = {client}