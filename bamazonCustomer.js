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
      console.log("Item id: " + answers.itemId + "\nQuantity: " + answers.quantity);

      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].item_id === answers.itemId) {
          chosenItem = results[i];
        }
      }
      console.log(chosenItem);

      connection.end();
    })
  })
}