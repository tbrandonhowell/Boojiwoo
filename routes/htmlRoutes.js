const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = function(db) {
  router.get('/register', function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/userview");
    } else {
      res.render("register"); 
    }
  });

  router.get("/userview", function (req, res) {
    if(req.isAuthenticated()) {
       // const user = {
       //    id: req.session.passport.user,
       //    isloggedin: req.isAuthenticated()
       //  }

      db.User.findOne({
        where:{
          id: req.session.passport.user.id
        }
      }).then(function(dbUser) {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        }
        console.log(user);
        res.render("userview", user);
      });
    }
    else {
      const user = {
          id: null,
          isloggedin: req.isAuthenticated()
        }
      res.redirect("/");
    }
  });

  router.get("/", function(req, res) {
    debugger;
    if(req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      }
      res.render('dashboard', user);
    }
    else {
      res.render('dashboard');
    }
  });

  router.get("/dashboard", function(req, res) {
    debugger;
    if(req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      }
      res.render('dashboard', user);
    }
    else {
      res.render('dashboard');
    }
  });

  router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  return router;
};
