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

let initializeFunction = () => {
    client.query(initialSetup.initialFunctionQuery, (err, res) => {
        if (!err) {
          console.log("Initial functions create success");
        } else {
          console.log(err.message);
        }
        client.end;
      })
}

let initializeTrigger = () => {
    client.query(initialSetup.initialTriggerQuery, (err, res) => {
        if (!err) {
          console.log("Initial triggers create success");
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

let addNewBook = (isbn, bookName, numberOfPage, purchasePrice, sellingPrice, initialStock, author, genre, publisherName) => {
    const query = `SELECT insertNewBook(${isbn}, '${bookName}', ${numberOfPage},${purchasePrice},${sellingPrice},${initialStock},'${author}','${genre}','${publisherName}');`
    console.log(query);
    client.query(query, (err, res) => {
        if (!err) {
          console.log("new book added " + isbn);
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

let getSingleBook = async (isbn) => {
    try{
        const query = `select * from book where isbn = ${isbn};`
        const res = await client.query(query)
        return (res.rows);
    } catch (err) {
        console.log(err.message);
        return err.message
    }
}

let getBookAuthor = async (isbn) => {
  try{
      const query = `select * from BookAuthor where isbn = ${isbn};`
      const res = await client.query(query)
      return (res.rows);
  } catch (err) {
      console.log(err.message);
      return err.message
  }
}

let getBookPublisher = async (isbn) => {
  try{
      const query = `select * from BookPublisher where isbn = ${isbn};`
      const res = await client.query(query)
      return (res.rows);
  } catch (err) {
      console.log(err.message);
      return err.message
  }
}

let getBookGenres = async (isbn) => {
  try{
      const query = `select * from BookGenre where isbn = ${isbn};`
      const res = await client.query(query)
      return (res.rows);
  } catch (err) {
      console.log(err.message);
      return err.message
  }
}

let getBookDetail = async (isbn) => {
  try{
      const singleBook = await getSingleBook(isbn)
      const author = await getBookAuthor(isbn)
      const publisher = await getBookPublisher(isbn)
      const genres = await getBookGenres(isbn)
      const res = singleBook.concat(author, publisher, genres)
      console.log(res);
      return (res);
  } catch (err) {
      console.log(err.message);
      return err.message
  }
}

let registerUser = async (username, address) => {
  try {
    const query = `INSERT into systemuser values ('${username}', '${address}', 'False')`;;
    const res = await client.query(query);
    console.log(username + " user create success");
    return username;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

let loginUser = async (username) => {
  try {
    const query = `select * from systemuser where username = '${username}'`;
    const res = await client.query(query);
    return res.rows[0];
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

module.exports = { getAllBooks, loginUser, registerUser, getBookDetail, getSingleBook, getBookPublisher, initializeTrigger, initializeFunction, initializeTable, initializeData, addNewBook}