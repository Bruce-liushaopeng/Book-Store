
class Basket {
    basket = []

    addToBasket = (isbn, amount) => {
        this.basket.push(new BasketItem(isbn, amount))
    }

    print = () => {
        console.log(" Here's the items in busket ");
        this.basket.forEach( b => {
            console.log("isbn:" + b.isbn + " | amount " + b.amount);
        })
    }

    addShippingAddress = (shippingAddress) => {
        this.basket.forEach(b => b.addShippingAddress(shippingAddress))
    }

    assignUser = (userName) => {
        this.basket.forEach(b => b.assignUser(userName))
    }

    getAllItems() {
        const itemObjs = this.basket.map(b => {
            return b.getItemObj()
        })
        return itemObjs
    }
}

class BasketItem {
    
    constructor(isbn, amount) {
            this.isbn = isbn
            this.amount = amount
    }

    assignUser(userName) {
        this.userName = userName
    }

    addShippingAddress(shippingAddress) {
        this.shippingAddress = shippingAddress
    }

    getItemObj = ()=> {
        const obj = {
            isbn: this.isbn,
            amount: this.amount,
            shippingAddress: this.shippingAddress,
            userName: this.userName
        }
        return obj
    }
}


module.exports = {Basket}