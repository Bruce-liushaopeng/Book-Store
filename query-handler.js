const db = require("./db")
const client = db.client
const initialSetup = require('./database-initialize-variables')
let getAllBooks = () => {
    client.query(initialSetup.getAllBooks, (err, res) => {
        if (!err) {
            console.log(res.rows);
          return res
        } else {
            console.log(err)
            return err.message;
        }
    })
}

let initializeTable = () => {
    client.query(initialSetup.createTable, (err, res) => {
        if (!err) {
          console.log("Table generated success");
        } else {
          console.log(err.message);
        }
        client.end;
    })
}

let initializeData = () => {
    client.query(initialSetup.initialDataQuery, (err, res) => {
        if (!err) {
          console.log("Initial query insert success");
        } else {
          console.log(err.message);
        }
        client.end;
      })
}

let createNewPublisher = (publisherName, address, email, BankAccount) => {
    const query = `INSERT into Publisher values ('${publisherName}', '${address}', '${email}', '${BankAccount}');`
    console.log(query);
    client.query(query, (err, res) => {
        if (!err) {
          console.log("New Publisher insert success");
        } else {
          console.log(err.message);
        }
        client.end;
      })
}



createNewPublisher('Bloomsburyyy Publing', '51 Be3ford S3qure, London', 'contact@l2o2msbury.com ', '1234567390976542')
console.log("finished")
exports.getAllBooks = getAllBooks