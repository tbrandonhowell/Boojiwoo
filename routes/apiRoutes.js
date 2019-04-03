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
  router.post('/newTask/:userId', ensureAuthenticated, AppController.newTask);
  router.post('/updateTask/:userId', ensureAuthenticated, AppController.updateTask);
  router.post('/completeTask/:userId/:taskId', ensureAuthenticated, AppController.completeTask);
  router.get('/getTasks/:userId', ensureAuthenticated, AppController.getTasks);
  router.delete('/deleteTask/:taskId', ensureAuthenticated, AppController.deleteTask);
  router.post('/purchaseSwag/:userId/:swagId', ensureAuthenticated, AppController.purchaseSwag);
  router.get('/getSwag/:userId', ensureAuthenticated, AppController.getSwag);
  router.post('/updateAvatar/:userId/:type/:swagId', ensureAuthenticated, AppController.updateAvatar);

  return router;
};
