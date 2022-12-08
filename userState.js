
class User {
    userName = ""
    isAdmin = false
    constructor() {
        this.userName = ""
        this.isAdmin = false
    }

    setUser = (userName) => {
        this.userName = userName
    }

    setIsAdmin = (isAdmin) => {
        this.isAdmin = isAdmin
    }

    clearUser = () => {
        this.userName = ""
        this.isAdmin = false
    }

    getUserName = () => {
        
        return this.userName
    }

    getIsAdmin = () => {
        return this.isAdmin
    }

    guestHelp = () => {
        console.log("Here's what you can do");
        console.log("<login> login to your account");
        console.log("<register> register to our book-store's account");
        console.log("<view-all-books> view all the books in the store" );
        console.log("<select> select a book to view detail");
        console.log("<add-to-basket> to add the book to like to your basket");
        console.log("<help> to view command line info again");
        console.log("<search-by-isbn> search a book by isbn");
        console.log("<search-by-author> search books by author");
        console.log("<search-by-genre> search books by genre");
        console.log("<search-by-publisher> search books by publisher");
        console.log("<search-by-name> search books by book name");
    }

    userHelp = () => {
        this.guestHelp()
        console.log("<logout> logout your account");
        console.log("<place-order> place order");
        console.log("<check-order> check your order");
        console.log("<user-info> view your information");
    }

    adminHelp = () => {
        this.userHelp()
        console.log("<add-new-book> add new book to the store");
        console.log("<logout> logout your account");
        console.log("<view-report> to view all the available reports");
    }

    printHelp = () => {
            if (! this.userName) {
                this.guestHelp()
                return 
            }
            if (this.isAdmin == false) {
                this.userHelp()
                return
            }
                this.adminHelp()
            }
    

    printUserInfo = () => {
        if ( !this.userName ) {
            console.log("Hi Guest");
            return
        }
        console.log("current user: " + this.userName);
        if ( this.isAdmin ) {
            console.log("ADMIN ACEESS");
        }
        
    }
}

module.exports = {User}