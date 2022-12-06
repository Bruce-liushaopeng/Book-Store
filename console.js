const queryHandler = require('./query-handler')
var prompt = require('prompt');
var { User } = require("./userState")
var { Basket } = require("./basketState");
var currentUser = new User();
var basket = new Basket();

prompt.start();

const initialize = async () => {
    // await queryHandler.initializeTable();
    // await queryHandler.initializeData();
    // await queryHandler.initializeFunction();
    // await queryHandler.initializeTrigger();
    //queryHandler.addNewBook( 9780747532748, 'Harry Potter and the Philosophers Stone5', 400, 15, 20, 15, 'J.K. Rowling', 'Advanture',  'Bloomsbury Publishing')

}
const addNewBookTest = async () => {
    await queryHandler.addNewBook( 9780747532333, 'Harry Potter and the Philosophers Stone5', 400, 15, 20, 15, 'J.K. Rowling', 'Advanture',  'Bloomsbury Publishing', 0.02)
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
const userConsole = async () => {
    currentUser.printUserInfo()
    currentUser.printHelp()
    while (true) {
        console.log('==============================');
        console.log("enter your command")
        const { input } = await prompt.get(['input'])
        console.log(input);
        if (input == 'view-all-books') {
            const res = await queryHandler.getAllBooks()
            console.log(res);
        }
        if (input == "add-new-book") {
            if(!currentUser.getUserName()) {
                console.log("Please login as ADMIN");
            } else if (!currentUser.getIsAdmin) {
                console.log(" You are not an ADMIN ");
            } else {
                console.log("Enter Book ISBN, BookName, NumberOfPage, PurchasePrice, SellingPrice, Initial stock, Author, genre, and publisher")
                const { isbn, bookName, numberOfPages, purchasePrice, sellingPrice, initialStock, author, genre, publisher, percentage } = await prompt.get(['isbn', 'bookName', 'numberOfPages', 'purchasePrice', 'sellingPrice', 'initialStock', 'author', 'genre', 'publisher', 'percentage'])
                const res = queryHandler.addNewBook(isbn, bookName, numberOfPages, purchasePrice, sellingPrice, initialStock, author, genre, publisher)
            }
        }

        if (input == "select") {
            //console.log("please input the ISBN of the book");
            //const { isbn } = await prompt.get(['isbn'])
            const { isbn } = await prompt.get(['isbn'])
            const bookdetail = await queryHandler.getBookDetail(isbn)
            console.log(bookdetail);
        }

        if (input == 'search-by-isbn') {
            console.log("Enter the ISBN of the book");
            const { isbn } = await prompt.get(['isbn'])
            const book = await queryHandler.searchByISBN(isbn)
            console.log(book);
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
//quickTest()
userConsole()
//addNewBookTest()
