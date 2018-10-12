module.exports = (app, db) => {

  const users = require('./controllers/user')(db);
  const order = require('./controllers/order')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  // CRUD users
  
  app.get('/users/new', users.newForm); //users/new has to be first other :id will overwrite and new != int
  app.get('/users/:id/order/:orderid/edit', order.edit);
  app.get('/users/:id/order/:orderid/cancel', order.cfmcancel);
  app.get('/users/:id', users.layout);
  app.get('/users', users.layout);
  app.post('/users', users.create);
  app.post('/users/login', users.login);
  app.put('/order/:orderid/edit', order.update);

  //CRUD orders

  app.post('/order/new', order.create);
  app.put('/order/:orderid/cancel', order.cancel);
  //app.delete('order')

};