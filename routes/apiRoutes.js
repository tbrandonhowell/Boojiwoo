const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = function(passport, db) {
  const AuthController = require('../controllers/authController')(db);
  const AppController = require('../controllers/appController')();

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', passport.authenticate('local', { failWithError: true }), AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', passport.authenticate('local', { failWithError: true }), AuthController.confirmAuth);

  // App
  router.get('/data', ensureAuthenticated, AppController.getData);

  return router;
};
