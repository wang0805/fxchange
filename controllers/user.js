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

  const index = (request, response) => {
    response.clearCookie('user_id');
    response.clearCookie('username');
    response.clearCookie('logged_in');


    response.render('user/index');
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
          response.status(200).redirect(`/user/${user_id}/profile`);
        }
        else {response.send("wrong password");}
      }
      else {response.send("no such user");}
    })
  }

  const profile = (request, response) => {

    //result for transactions, orders and market info shown here

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
    index,
    profile
  };

};
