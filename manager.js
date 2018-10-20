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
  inquirer.prompt([
    {
      name: "action",
      message: "Select an action",
      type: "list",
      choices: [
        "View products for sale",
        "View low inventory",
        "Add to inventory",
        "Add new product"
      ]
    }
  ])
  .then(function(answer) {

    if (answer.action === "View products for sale") {
      viewProducts();
    } else if (answer.action === "View low inventory") {
      viewLowInv();
    } else if (answer.action === "Add to inventory") {
      addToInv();
    } else if (answer.action === "Add new product") {
      addProduct();
    }
  })
}

function viewProducts() {
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
    start();
  })
}

function viewLowInv() {
  connection.query("SELECT * FROM products WHERE quantity < 5", function(err, results) {
    if (err) throw err;

    //List the products for sale in a readable format
    console.log("\nLOW INVENTORY:\n")
    for (var i = 0; i < results.length; i++) {
      console.log(
        results[i].item_id + " | " + results[i].product_name + " | Quantity: " + results[i].quantity +
        "\n-------------------------------------------------" 
      );
    }
    start();
  })
}

function addToInv() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "itemId",
        message: "What is the ID of the item you are adding to?",
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
        message: "How many would you like to add?",
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
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].item_id === parseInt(answers.itemId)) {
          chosenItem = results[i];
        }
      }

      var newQuantity = parseInt(chosenItem.quantity) + parseInt(answers.quantity);
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            quantity: newQuantity
          },
          {
            item_id: chosenItem.item_id
          }
        ],
        function(err, res) {
          if (err) throw err;
          console.log("Database updated!\n");
          start();
        }
      )
      console.log("Quantity updated: " + newQuantity);
    })
  })
}

function addProduct() {

}