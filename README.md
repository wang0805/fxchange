# Fxchange

Fxchange is web application inspired from the boom in trading of (back then) illquid cryptocurrencies against fiat currencies such as SGD. This application mimicks a real electronic stock trading application whereby there is a matching mechanism to which when a user creates an order, it will try to match with the first counterparty in the queue.

### Demo

You can see how the web application works below:

![GIF](https://github.com/wang0805/fxchange/blob/master/public/images/02.gif)

[Link to Application](https://enigmatic-basin-19796.herokuapp.com/)

### Tools being used
- [React](https://reactjs.org/) - Templating engine
- [NodeJS](http://nodejs.org) - Server-side Javascript
- [Postgresql](https://www.postgresql.org/) - Object-relational database system
- [Express](https://expressjs.com/) - Web Framework for Node.js

*Foundational knowledge of Express and PSQL were heavily utilized in this particular project in order to build the matching system. 

### Development Roadmap

- Entire application is meant to be a single page application whereby different components of the app are being imported into the main layout.jsx file
- Components include logins, our order history, our transaction history, all orders displayed in a stock trading 'level 2' concept
- All orders component is done using AJAX call to our all orders route such that the entire layout do not need to re-render
- Sorting of our orders are done using DOM manipulation
- Matching engine is done through a large series of nested queries to the database;
- Firstly, when a create order query is executed, an index query is fired to check that order against the active counterparties.
- Next, if multiple counterparties with the same price is found, the order will match with the first price in the FIFO (first in first out) queue. If the quantity of the counterparty > our quantity, our order is automatically changed to filled. Otherwise, if our quantity cannot be filled by existing orders, then the remaining will spill to a new active order
- Lastly, if a transaction has occured. It will create a new buy/sell transaction depending on which side we are coming from.
- Edit and delete(cancellation) of orders are made to follow as much as possible, to real electronic trading apps. 

## Author(s)

- Wenhao Wang

## How To Play

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/wang0805/fxchange.git

# Go into the repository
$ cd fxchange

# Install dependencies
$ npm install

# Initiate the app via node or nodemon
$ node index.js
```

Thank you!
