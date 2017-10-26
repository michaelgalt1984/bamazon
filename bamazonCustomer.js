var bodyParser = require('body-parser');

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  // port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1111",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
  // allInfo();
  // flavourInfo("chocolate");
  connection.end();
});

// mysql> SELECT * FROM sometable\G;



// function allInfo() {
//   connection.query("SELECT * FROM products",
//   function(err, res) {
//     if (err) throw err;
//     console.log(res);
//   });
// }

// function flavourInfo(flavor) {
//   connection.query(
//     "SELECT * FROM products WHERE flavor=?",
//     [flavor],
//     function(err, res) {
//       if (err) throw err;
//       console.log(res);
//     });
// }

function start() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "Would you like to [POST] an auction, [BID] on an auction or [EXIT]?",
      choices: ["POST", "BID", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid === "POST") {
        postAuction();
      }
      else if (answer.postOrBid === "BID") {
        bidAuction();
      }
      else {
        connection.end();
      }
    });
}



function bidAuction() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM auctions", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "What auction would you like to place a bid in?"
        },
        {
          name: "bid",
          type: "input",
          message: "How much would you like to bid?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
              {
                highest_bid: answer.bid
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Bid placed successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          start();
        }
      });
  });
}