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

let addNewBook = (isbn, bookName, numberOfPage, purchasePrice, sellingPrice, initialStock, author, genre, publisherName, percentage) => {
    const query = `SELECT insertNewBook(${isbn}, '${bookName}', ${numberOfPage},${purchasePrice},${sellingPrice},${initialStock},'${author}','${genre}','${publisherName}', ${percentage});`
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

let SearchByBookName = async (bookName) => {
  try{
      const query = `select BookName 
        from Book
        where BookName LIKE '%${bookName}%';`
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
      return (res);
  } catch (err) {
      console.log(err.message);
      return err.message
  }
}

let searchByISBN = async (isbn) => {
  try{
      const res = await getSingleBook(isbn)
      return (res);
  } catch (err) {
      console.log(err.message);
      return err.message
  }
}

let registerUser = async (username, address) => {
  try {
    const query = `INSERT into systemuser values ('${username}', '${address}', 'False');`
    const res = await client.query(query);
    console.log(username + " user create success");
    return username;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

let addSystemOrder = async (shippingAddress, userName) => {
  try {
    const query = `select addSystemOrder('${shippingAddress}', '${userName}');`;
    const res = await client.query(query);
    console.log(userName +" System Order added");
    return res;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

let updateOrderBook = async (isbn, orderAmount) => {
  try {
    const query = `select updateOrderBook(${isbn}, ${orderAmount});`;
    const res = await client.query(query);
    console.log("Order success: " + isbn + " x " + orderAmount);
    return res;
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

let getOrderNumber = async () => {
  try {
    const query = `select MAX(ordernumber) from systemOrder`;
    const res = await client.query(query);
    return res.rows[0].max;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};


let handleBasketOrder = async (basketItems) => {
  try {
    console.log(basketItems);
    const {shippingAddress, userName} = basketItems[0]
    await addSystemOrder(shippingAddress, userName)
    basketItems.forEach(item => {
      const {isbn, amount} = item
      updateOrderBook(isbn, amount)
    })
    console.log("Order placement complete");
    const orderNumber = await getOrderNumber();
    console.log("Order Number: " + orderNumber);
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

let getBestSalePublisher = async () => {
  try {
    const query = initialSetup.getBestSalePublisher;
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

let getOrder = async (ordernumber, username) => {
  try {
    const query = `select * from systemorder natural join orderbook where ordernumber = ${ordernumber} and username = '${username}'`;
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

let getBestAuthorBySaleUnit = async () => {
  try {
    const query = `select * 
      from bestauthor_amount
      where salesa = (select max(salesa) from bestauthor_amount);`;
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

let getBestAuthorByRevenue = async () => {
  try {
    const query = `select * 
      from bestauthor_sales
      where sales = (select max(sales) from bestauthor_sales)`;
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

let searchByGenre = async (genre) => {
  try {
    const query = `select isbn, bookname, genre from book natural join bookgenre where genre = '${genre}'`;
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

let searchByAuthor = async (author) => {
  try {
    const query = `select isbn, bookname, author from book natural join bookauthor where author LIKE '%${author}%';`;
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

let searchByPublisher = async (publisher) => {
  try {
    const query = `select isbn, bookname, publisherName from book natural join bookPublisher where publisherName = '${publisher}'`;
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

let getSaleExpendReport = async () => {
  try {
    const query = initialSetup.getSellExpendReport;
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

let getPublisherSale = async () => {
    try {
      const query = initialSetup.getSaleExpendReport;
      const res = await client.query(query);
      return res.rows[0];
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
};

module.exports = { searchByGenre, searchByAuthor, getPublisherSale, searchByPublisher,getBestSalePublisher, getBestAuthorBySaleUnit, getBestAuthorByRevenue,SearchByBookName, addBookPublisher, searchByISBN, getOrder, handleBasketOrder, addSystemOrder, updateOrderBook, getSaleExpendReport, getAllBooks, loginUser, registerUser, getBookDetail, getSingleBook, getBookPublisher, initializeTrigger, initializeFunction, initializeTable, initializeData, addNewBook}