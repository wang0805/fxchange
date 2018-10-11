module.exports = (app, db) => {

  const users = require('./controllers/user')(db);
  const order = require('./controllers/order')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users

  app.get('/users/:id', users.layout);
  app.get('/users', users.layout);
  app.get('/users/new', users.newForm);
  app.post('/users', users.create);
  app.post('/users/login', users.login);

  //CRUD orders

  app.post('/order/new', order.create);
  //app.delete('order')

};