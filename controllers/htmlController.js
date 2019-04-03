const db = require('../models')

module.exports = function () {
    return {
        register: (req, res) => {
            if (req.isAuthenticated()) {
              res.redirect('/profile');
            } else {
              res.render('register');
            }
        },
        profile: (req, res) => {
            if (req.isAuthenticated()) {
              db.User.findOne({
                where: {
                  userId: req.session.passport.user.id
                }
              }).then(() => {
                const user = {
                  user: req.session.passport.user,
                  isloggedin: req.isAuthenticated()
                };
                console.log(user)
                res.render('profile', {user: user});
              });
            } else {
              res.redirect('/');
            }
        },
        dashboard: (req, res) => {
            if (req.isAuthenticated()) {
              const user = {
                user: req.session.passport.user,
                isloggedin: req.isAuthenticated()
              };
              res.render('dashboard', {user: user});
            } else {
              res.render('dashboard');
            }
        },
        logout: (req, res, next) => {
            req.logout();
            req.session.destroy((err) => {
              if (err) {
                return next(err);
              }
              res.clearCookie('connect.sid', { path: '/' });
              res.redirect('/');
            });
        },
        tasks: (req, res) => {
            if (req.isAuthenticated()) {
              const user = {
                user: req.session.passport.user,
                isloggedin: req.isAuthenticated()
              };
              res.render('tasks', {user: user});
            } else {
              res.render('login');
            }
        },
        store: (req,res) => {
            if (req.isAuthenticated()) {
                const user = {
                user: req.session.passport.user,
                isloggedin: req.isAuthenticated()
            };
                  // whatever it is we're going to need build out this page
                res.render('store', {user: user});
            } else {
              res.render('login');
            }
        }
    };
};

// Common functions
const getSwag = (userId, callback) => {
    db.SwagStore.findAll({
        attributes: [
          'swagId', 'swagType', 'description', 'fileName', 'pointCost',
          [db.sequelize.literal('CASE WHEN NULLIF(swagOwneds.userId,\'\') IS NULL THEN false ELSE true END'), 'owned']
        ],
        include: [{
          model: db.SwagOwned,
          required: false,
          where: {
            userId: userId
          }
        }]
      }).then((swag) => {
        callback(swag)
    });
}