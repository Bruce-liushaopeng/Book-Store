//import postgreSql module from npm
let query = require("./database-initialize-variables.js");
// made a client object for establish connection
const {client} = require("./db")
var { User } = require("./userState")
var { Basket } = require("./basketState");
const queryHandler = require('./query-handler')
var basket = new Basket();
var basket2 = new Basket();


const placeInitialOrder = async () => {
  console.log("adding initial orders");
  basket.addToBasket(9780747532743, 3)
  basket.addToBasket(9780747546245, 2)
  basket.assignUser("user1")
  basket.addShippingAddress("myhonmeAddress 101")
  const items = basket.getAllItems()
  const result1 =  await queryHandler.handleBasketOrder(items)

  basket2.addToBasket(9780747532743, 4)
  basket2.addToBasket(9780747546245, 5)
  basket2.addToBasket(9780553573428, 3)
  basket2.addToBasket(9780553582024, 2)
  basket2.addToBasket(9780002247412, 6)
  basket2.assignUser("user2")
  basket2.addShippingAddress("myhonmeAddress 201")
  const items2 = basket2.getAllItems()
  const result2 =  await queryHandler.handleBasketOrder(items2)
  if (result1 && result2) {
    console.log("initial order placed");
  }

}

let initialize = async() => {

  await client.query(query.createTable, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("table create success")
    }})

  await client.query(query.initialDataQuery, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("initial data success")
  }})

  await client.query(query.initialFunctionQuery, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("initial function success")
  }})

  await client.query(query.initialTriggerQuery, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("inital trigger success")
  }})
}

//initialize()
placeInitialOrder()