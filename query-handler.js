const db = require("./db")
const client = db.client
const initialSetup = require('./database-initialize-variables')

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

let addBookPublisher = (ibsn, publisherName, percentage) => {
    const query = `INSERT into BookPublisher values ('${ibsn}', '${publisherName}', '${percentage}');`
    console.log(query);
    client.query(query, (err, res) => {
        if (!err) {
          console.log("book-publisher insert success");
          return res.rows
        } else {
          console.log(err.message);
          return(err.message)
        }
        client.end;
    })
}

// let getAllBooks = () => {
//     client.query(initialSetup.getAllBooks, (err, res) => {
//         if (!err) {
//             console.log(res.rows);
//             return res.rows
//         } else {
//             console.log(err)
//             return err.message;
//         }
//     })
// }

let getAllBooks = async () => {
    try{
        const res = await client.query(initialSetup.getAllBooks)
        console.log("All books fetch success");
        console.log(res.rows.length);
        return (res.rows);
    } catch (err) {
        console.log(err.message);
        return err.message
    }
}

let getBookDetail = async (isbn) => {
    try{
        const query = `select * from book where isbn = ${isbn};`
        const res = await client.query(query)
        return (res.rows);
    } catch (err) {
        console.log(err.message);
        return err.message
    }
}
module.exports = {getAllBooks}