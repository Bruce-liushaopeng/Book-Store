const queryHandler = require('./query-handler')
var prompt = require('prompt');
prompt.start();
const userConsole = async () => {
    while (true) {
        console.log("enter your command")
        const { input } = await prompt.get(['input'])
        console.log(input);
        if (input == 'view-all-books') {
            const res = await queryHandler.getAllBooks()
            console.log(res);
        }
    }
}

userConsole()

