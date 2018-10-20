var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " +
    connection.threadId);
    start();
});

function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    //List the products for sale in a readable format
    console.log("\nPRODUCTS FOR SALE:\n")
    for (var i = 0; i < results.length; i++) {
      console.log(
        results[i].item_id + " | " + results[i].product_name +
        "\nDepartment: " + results[i].department_name +
        "\nQuantity: " + results[i].quantity + " | Price: $" + results[i].price +
        "\n-------------------------------------------------" 
      );
    }

    inquirer
    .prompt([
      {
        name: "itemId",
        message: "What is the ID of the item you would like to buy?",
        type: "input",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        message: "How many would you like to purchase?",
        type: "input",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answers) {
      // init and get chosen item from database
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].item_id === parseInt(answers.itemId)) {
          chosenItem = results[i];
        }
      }

      if (chosenItem.quantity == 0) {
        console.log("Sorry, this item is out of stock!");
      }
      else if (chosenItem.quantity >= answers.quantity) {
        // "Fulfill" the order and display the item's remaining quantity
        // Display the total cost of the customer's purchase
        var total = chosenItem.price * answers.quantity;
        console.log("You pay $" + total);
        var quantityRemaining = chosenItem.quantity - answers.quantity;
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              quantity: quantityRemaining
            },
            {
              item_id: chosenItem.item_id
            }
          ],
          function(err, res) {
            if (err) throw err;
            console.log("Database updated!\n");
          }
        )
        console.log("Quantity remaining: " + quantityRemaining);

      } else {
        console.log("Sorry, we only have " + chosenItem.quantity + " of this item in stock, and cannot fulfill your order.");
      }

      connection.end();
    })
  })
}