module.exports = (app, db) => {

  const user = require('./controllers/user')(db);
  const order = require('./controllers/order')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users', users.userRoot);
  app.get('/users/new', users.newForm);
  app.post('/users', users.create);
  app.post('/users/login', users.userLogin);

};