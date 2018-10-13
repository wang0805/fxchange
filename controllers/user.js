var sha256 = require('js-sha256');
const SALT = "fxchange";

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const newForm = (request, response) => {
    response.render('user/newUser');
  };

  //layout for dashboard
  const layout = (request, response) => {

    let cookies = request.cookies;

    db.order.index((error,result) => {
      if (error) {
            console.error('error: ', error);
            response.sendStatus(500);
        }
        else {
          //console.log("index order controller: ", result.rows);
          let order = result.rows;
          console.log( "orders   :", order);
          db.transactions.indexbuy(cookies.user_id, (error, result) => {
            if (error) {
              console.error("query error", error);
              response.sendStatus(500);
            }
            else {

              let buytransactions = result.rows;
              console.log("buy order id    :", buytransactions);

              db.transactions.indexsell(cookies.user_id, (error, result) => {
                if (error) {
                  console.error("query error", error);
                  response.sendStatus(500);
                }
                else {
                  let selltransactions = result.rows;
                  console.log("sell order id    :", selltransactions);

                  response.render('layouts/dashboard', {order: order, buytransactions: buytransactions, selltransactions: selltransactions, cookies: cookies});
                }
              })
            }
          })
        }
    })
  };

  const create = (request, response) => {

    db.user.create(request.body, (error, queryResult) => {
      if (error) {
        console.error('error getting user:', error);
        response.sendStatus(500);
      }

      if (queryResult.rowCount >= 1) {
        console.log('User created successfully');

      } else {
        console.log('User could not be created');
      }

      // redirect to home page after creation
      response.redirect('/users');
    });
  };

  const login = (request, response) => {

    db.user.login(request.body, (error, result) => {
      //console.log(request.body);
      console.log("result controller: ", result.rows);
      if(error) {
        console.error("Query error", error);
      }

      else if(result.rows[0]!=undefined){

        let user_id = result.rows[0].id;

        if(sha256(request.body.password) === result.rows[0].password){

          response.cookie('logged_in', sha256(SALT+user_id));
          response.cookie('username', request.body.name);
          response.cookie('user_id', user_id);
          response.status(200).redirect(`/users/${user_id}`);
        }
        else {response.send("wrong password");}
      }
      else {response.send("no such user");}
    })
  };

  const logout = (request, response) => {

    response.clearCookie('logged_in');
    response.clearCookie('user_id');
    response.clearCookie('username');

    response.redirect("/users");    
  }

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    login,
    logout,
    layout
  };

};
