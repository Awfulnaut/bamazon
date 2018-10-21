# Bamazon
In this project, I hooked up node to a MySQL databse containing a table of products for sale. Two different interactions are available; customer and manager. Both of these views take advantage of the [mysql](https://www.npmjs.com/package/mysql) and [inquirer](https://www.npmjs.com/package/inquirer) npm packages.

## Customer
In the customer view, users are presented with a list of products for sale, which includes the product's ID number, name, department, quantity, and price. The user inserts the ID of the item they wish to buy, along with a quantity. If the item is in stock, and if the item's stock is greater than the quantity requested, the order will be fulfilled, displaying the price the user must pay. It then updates the database to reflect the new quantity. If there are not enough items in stock, a message is displayed.

## Manager
In the manager view, users can view the products for sale, view low inventory products ( >5 items remaining ), add additional inventory, and add new products. When adding more inventory, the user must provide the item ID and the number of items they would like to add to the existing stock. When adding a new item, the user must provide the product's name, department, quantity, and price.

---
For more information, email [cadin.mcqueen@gmail.com](mailto:cadin.mcqueen@gmail.com).