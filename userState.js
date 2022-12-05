
class User {
    userName = ""
    isAdmin = false
    constructor() {
    }

    setUser = (userName) => {
        currentUser.userName = userName
    }

    setIsAdmin = (isAdmin) => {
        currentUser.isAdmin = isAdmin
    }

    ClearUser = () => {
        currentUser = {}
    }

    getUserName = () => {
        return this.userName
    }

    getIsAdmin = () => {
        return this.isAdmin
    }

    printHelp = () => {
            console.log("Help Friend, welcome");
            console.log("user <Register> to register");
            console.log("reference to README to more command detail");
    }

    printUserInfo = () => {
        if ( !this.userName ) {
            console.log("user <Register> to register");
        }
        console.log("current user: " + this.userName);
        if ( this.isAdmin ) {
            console.log("ADMIN ACEESS");
        }
        
    }
}

module.exports = {User}