const queryHandler = require('./query-handler')
var prompt = require('prompt');
var { User } = require("./userState")
currentUser = new User();

prompt.start();

const initialize = async () => {
    // await queryHandler.initializeTable();
    // await queryHandler.initializeData();
    // await queryHandler.initializeFunction();
    // await queryHandler.initializeTrigger();
    //queryHandler.addNewBook( 9780747532748, 'Harry Potter and the Philosophers Stone5', 400, 15, 20, 15, 'J.K. Rowling', 'Advanture',  'Bloomsbury Publishing')
}
const quickTest = async() => {
    //queryHandler.getBookDetail(9780747532743);
    queryHandler.loginUser("userB")
}
const userConsole = async () => {
    
    while (true) {
        console.log("enter your command")
        const { input } = await prompt.get(['input'])
        console.log(input);
        if (input == 'view-all-books') {
            const res = await queryHandler.getAllBooks()
            console.log(res);
        }
        if (input == "add-new-book") {
            console.log("enter bookInfo")
            const { bookinfo } = await prompt.get(['bookinfo'])
        }

        if (input == "select") {
            //console.log("please input the ISBN of the book");
            //const { isbn } = await prompt.get(['isbn'])
            const { isbn } = await prompt.get(['isbn'])
            const bookdetail = await queryHandler.getBookDetail(isbn)
            console.log(bookdetail);
        }

        if (input == "login") {
            const { userName } = await prompt.get(['userName'])
            const loginResult = await queryHandler.loginUser(userName)
            if (!loginResult) {
                console.log("User Not Found, try Again");
            } else {
                const { username, isadmin } = loginResult
                currentUser.setUser(userName);
                currentUser.setIsAdmin(isadmin);
                console.log(username + "login success");
            }
        }

        if (input == "help") {
            currentUser.printHelp()
        }
    }
}
// quickTest()
userConsole()
