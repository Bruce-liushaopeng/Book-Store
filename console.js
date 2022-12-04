const queryHandler = require('./query-handler')
var prompt = require('prompt');
prompt.start();
const initialize = async () => {
    // await queryHandler.initializeTable();
    // await queryHandler.initializeData();
    // await queryHandler.initializeFunction();
    // await queryHandler.initializeTrigger();
    queryHandler.addNewBook( 9780747532718, 'Harry Potter and the Philosophers Stone3', 400, 15, 20, 15, 'J.K. Rowling', 'Advanture',  'Bloomsbury Publishing')
}
const userConsole = async () => {
    
    while (true) {
        await queryHandler.initializeFunction();
        await queryHandler.initializeTrigger();
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
    }
}
initialize()
