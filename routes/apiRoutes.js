const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')();

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // App
  router.get('/data', ensureAuthenticated, AppController.getData);
  router.post('/newTask', ensureAuthenticated, AppController.newTask);
  router.post('/updateTask', ensureAuthenticated, AppController.updateTask);
  router.post('/completeTask', ensureAuthenticated, AppController.completeTask);
  router.get('/getTasks', ensureAuthenticated, AppController.getTasks);
  router.delete('/deleteTask', ensureAuthenticated, AppController.deleteTask);
  router.post('/purchaseSwag', ensureAuthenticated, AppController.purchaseSwag);
  router.get('/getSwag', ensureAuthenticated, AppController.getSwag);
  router.post('/updateAvatar', ensureAuthenticated, AppController.updateAvatar);

  return router;
};
