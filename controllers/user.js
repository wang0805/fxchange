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

  const layout = (request, response) => {

    let cookies = request.cookies;

    console.log("request cookies", request.cookies);
    response.render('layouts/default', cookies);

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
    layout
  };

};
