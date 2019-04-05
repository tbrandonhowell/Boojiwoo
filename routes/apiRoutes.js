const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')();

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:userId', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // App
  router.get('/data', ensureAuthenticated, AppController.getData);
  router.post('/newTask', ensureAuthenticated, AppController.newTask);
  router.post('/updateTask', ensureAuthenticated, AppController.updateTask);
  router.post('/completeTask/:taskId', ensureAuthenticated, AppController.completeTask);
  router.get('/getTasks', ensureAuthenticated, AppController.getTasks);
  router.delete('/deleteTask/:taskId', ensureAuthenticated, AppController.deleteTask);
  router.get('/getSwag', ensureAuthenticated, AppController.getSwag);
  router.post('/updateAvatar/:cmd', ensureAuthenticated, AppController.updateAvatar);
  router.post('/purchaseSwag/:swagId', ensureAuthenticated, AppController.purchaseSwag);


  return router;
};
