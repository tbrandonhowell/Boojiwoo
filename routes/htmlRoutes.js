const router = require('express').Router();


module.exports = (db) => {
  const HtmlController = require('../controllers/htmlController')();

  // Pages
  router.get('/', HtmlController.tasks);
  router.get('/upgrade', HtmlController.store);
  router.get('/profile', HtmlController.profile);
  router.get('/dashboard', HtmlController.dashboard);
  router.get('/register', HtmlController.register);
  router.get('/logout', HtmlController.logout);


  return router;
};
