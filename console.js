const queryHandler = require('./query-handler')
var prompt = require('prompt');
var { User } = require("./userState")
var { Basket } = require("./basketState");
const { query } = require('express');
var currentUser = new User();
var basket = new Basket();

prompt.start();

const initialize = async () => {
    // await queryHandler.initializeTable();
    // await queryHandler.initializeData();
    // await queryHandler.initializeFunction();
    // await queryHandler.initializeTrigger();
    // queryHandler.addNewBook( 9780747532748, 'Harry Potter and the Philosophers Stone5', 400, 15, 20, 15, 'J.K. Rowling', 'Adventure',  'Bloomsbury Publishing')
}
const addNewBookTest = async () => {
    await queryHandler.addNewBook( 9780747532333, 'Harry Potter and the Philosophers Stone5', 400, 15, 20, 15, 'J.K. Rowling', 'Adventure',  'Bloomsbury Publishing', 0.02)
}

const testSearchBooName = async () => {
    const result = await queryHandler.getBookByBookName("Harry")
    console.log(result);
}

const getOrderTest = async () => {
    const result = await queryHandler.getOrder("1037", "user1")
    console.log(result);
}

const testgetBestSalePublisher = async () => {
    const result = await queryHandler.getBestSalePublisher()
    console.log(result);
}

const placeOrderTestCase = () => {
    console.log("teststart");
    basket.addToBasket(9780747532743, 3)
    basket.addToBasket(9780747546245, 2)
    basket.assignUser("user1")
    basket.addShippingAddress("myhonmeAddress 101")
    const items = basket.getAllItems()
    const result = queryHandler.handleBasketOrder(items)
}

const bookReportTest = async() => {
    const res = await queryHandler.getGenreReport();
    console.log(res);
}

const userConsole = async () => {
    currentUser.printUserInfo()
    currentUser.printHelp()
    while (true) {
        console.log('==============================');
        console.log("enter your command")
        const { input } = await prompt.get(['input'])
        console.log(input);
        if (input == "view-all-books") {
            const res = await queryHandler.getAllBooks();
            if (currentUser.getIsAdmin()) console.log(res);
            else {
              let bookArray = [];
              for (let i = 0; i < res.length; i++) {
                let temp = {};
                temp["isbn"] = res[i]["isbn"];
                temp["bookname"] = res[i]["bookname"];
                temp["numberofpages"] = res[i]["numberofpages"];
                bookArray.push(temp);
              }
              console.log(bookArray);
            }
          }
        if (input == "add-new-book") {
            if(!currentUser.getUserName()) {
                console.log("Please login as ADMIN");
            } else if (!currentUser.getIsAdmin()) {
                console.log(" You are not an ADMIN ");
            } else {
                console.log("Enter Book ISBN, BookName, NumberOfPage, PurchasePrice, SellingPrice, Initial stock, Author, genre, and publisher")
                const { isbn, bookName, numberOfPages, purchasePrice, sellingPrice, initialStock, author, genre, publisher, percentage } = await prompt.get(['isbn', 'bookName', 'numberOfPages', 'purchasePrice', 'sellingPrice', 'initialStock', 'author', 'genre', 'publisher', 'percentage'])
                const res = queryHandler.addNewBook(isbn, bookName, numberOfPages, purchasePrice, sellingPrice, initialStock, author, genre, publisher, percentage)
            }
        }

        if (input == "check-order") {
            if (!currentUser.getUserName()) {
                console.log("Login to your account first");
            } else {
                const { orderNumber } = await prompt.get(['orderNumber'])
                const result = await queryHandler.getOrder(orderNumber, currentUser.userName)
                if(result.length) {
                    console.log("Here's your order, estimate arrive in 5 days");
                    console.log(result);
                } else {
                    console.log("No corresponding order number package for you");
                }
                
            }
        }

        if (input == "select") {
            //console.log("please input the ISBN of the book");
            //const { isbn } = await prompt.get(['isbn'])
            const { isbn } = await prompt.get(["isbn"]);
            const bookdetail = await queryHandler.getBookDetail(isbn);
            if (!currentUser.getIsAdmin()) {
              let bookinfo = {
                bookname: bookdetail[0]["bookname"],
                bookIsbn: bookdetail[0]["isbn"],
                numberofpages: bookdetail[0]["numberofpages"],
                quantityinstock: bookdetail[0]["quantityinstock"],
                author: bookdetail[1]["author"],
                publisher: bookdetail[2]["publishername"],
                genre: [],
              };
              for (let i = 3; i < bookdetail.length; i++) {
                bookinfo["genre"].push(bookdetail[i]["genre"]);
              }
              console.log(bookinfo);
            } else console.log(bookdetail);
          }

        if (input == 'search-by-isbn') {
            console.log("Enter the ISBN of the book");
            const { isbn } = await prompt.get(['isbn'])
            const book = await queryHandler.searchByISBN(isbn)
            console.log(book);
        }

        if (input == 'search-by-bookname') {
            console.log("Enter the name of the book");
            const { bookname } = await prompt.get(['bookname'])
            const books = await queryHandler.SearchByBookName(bookname)
            console.log(books);
        }

        if (input == 'search-by-genre') {
            console.log("Enter the name of the genre");
            const { genre } = await prompt.get(['genre'])
            const books = await queryHandler.searchByGenre(genre)
            console.log(books);

        } if (input == 'search-by-author') {
            console.log("Enter the name of the author");
            const { author } = await prompt.get(['author'])
            const books = await queryHandler.searchByAuthor(author)
            console.log(books);
        }

        if (input == 'search-by-publisher') {
            console.log("Enter the name of the publisher");
            const { publisher } = await prompt.get(['publisher'])
            const books = await queryHandler.searchByPublisher(publisher)
            console.log(books);
        }

        if (input == "logout") {
            if(! currentUser.getUserName()){
                console.log("You are not login yet, can not logout");
            } else {
                username = currentUser.getUserName()
                currentUser.clearUser()
                console.log("logout success, bye " + username);
            }
        }

        if (input == "login") {
            const { userName } = await prompt.get(['userName'])
            const loginResult = await queryHandler.loginUser(userName)
            if (!loginResult) {
                console.log("User Not Found, try Again");
            } else {
                const { username, isadmin } = loginResult
                currentUser.setUser(username);
                currentUser.setIsAdmin(isadmin);
                currentUser.printUserInfo();
                currentUser.printHelp();
            }
        }

        if (input == 'view-report') {
            if (!currentUser.isAdmin) {
                console.log("Only Admin user can view report, sorry");
            } else {
                var viewing_report = true;
                while (viewing_report) {
                    console.log("Which report you want to see ");
                    console.log("<book-report> to view book report");
                    console.log("<publisher-report> to view publisher report");
                    console.log("<genre-report> to view genre report");
                    console.log("<author-report> to view author report");
                    console.log("<end> Finish viewing report, back to menu");
                    const { type } = await prompt.get(['type'])
                    if(type == "book-report") {
                        const res = await await queryHandler.getBookReport();
                        console.log(res);
                    } else if (type == "author-report") {
                        const res = await queryHandler.getAuthorReport();
                        console.log(res);
                    } else if (type == "genre-report") {
                        const res = await queryHandler.getGenreReport();
                        console.log(res);
                    } else if (type == "publisher-report") {
                        const res = await queryHandler.getPublisherReport();
                        console.log(res);
                    } 
                    else if (type == "end") {
                        console.log("thanks for using report function.");
                        viewing_report = false;
                }
            }
        }
    }

        if (input == "place-order") {
            if (!currentUser.getUserName()) {
                console.log("Please first <login> or <register> to prcceed");
            } else {
                console.log("Please provide shipping address: ");
                const { shippAddress } = await prompt.get(['shippAddress'])
                basket.addShippingAddress(shippAddress)
                basket.assignUser(currentUser.getUserName())
                var basketItemsObj = basket.getAllItems()
                queryHandler.handleBasketOrder(basketItemsObj)
                console.log(basketItemsObj);
            }
        }

        if (input == "register") {
            console.log("Please provide your username and address");
            const { userName, address } = await prompt.get(["userName", "address"]);
            const res = await queryHandler.registerUser(userName, address);
            if (res) {
                console.log("await returned");
                currentUser.setUser(userName)
                currentUser.setIsAdmin(false)
                currentUser.printUserInfo()
            }
        }

        if (input == "help") {
            currentUser.printHelp()
        }

        if (input == "user-info") {
            currentUser.printUserInfo()
        }

        if (input == "add-to-basket") {
            console.log("Please prodive ISBN of the book:  ");
            const { isbn } = await prompt.get(['isbn'])
            console.log("Input an amount: ");
            const { amount } = await prompt.get(['amount'])
            basket.addToBasket(isbn, amount)
        }

        if (input == "view-basket") {
            basket.print()
        }
    }
}
//userConsole()
//addNewBookTest()
//testSearchBooName()
//placeOrderTestCase()
//testgetBestSalePublisher()
//getOrderTest()
totalPriceTest()
