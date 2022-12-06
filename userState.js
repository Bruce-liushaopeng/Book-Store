
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

    ClearUser = () => {
        userName = {}
        this.isAdmin = false
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
            return
        }
        console.log("current user: " + this.userName);
        if ( this.isAdmin ) {
            console.log("ADMIN ACEESS");
        }
        
    }
}

module.exports = {User}