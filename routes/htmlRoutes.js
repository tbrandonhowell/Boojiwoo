const router = require('express').Router();

module.exports = (db) => {
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('register');
    }
  });

  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Original Route:
  // router.get('/', (req, res) => {
  //   if (req.isAuthenticated()) {
  //     const user = {
  //       user: req.session.passport.user,
  //       isloggedin: req.isAuthenticated()
  //     };
  //     res.render('dashboard', user);
  //   } else {
  //     res.render('dashboard');
  //   }
  // });

  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('tasks', user);
    } else {
      res.render('login');
    }
  });


  router.get('/upgrade', (req,res) => {
    if (req.isAuthenticated()) {
      // whatever it is we're going to need build out this page
      res.render('store');
    } else {
      res.render('login');
    }
  })


  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  return router;
};
