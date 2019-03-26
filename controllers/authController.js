module.exports = function (db) {
  return {
    register: function (req, res) {
      if (!req.body.email || !req.body.password) {
        return res.json({ message: 'Email and Password required!'});
      }

      db.User.sync().then(function () {
        const newUser = {
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        };

        return db.User.create(newUser).then(function () {
          res.status(200).json({ message: 'Registered successfully.' });
        });
      }).catch(function (err) {
        console.log(err);
        res.status(403).json({ error: 'Email already exists!' });
      });
    },
    login: function (req, res) {
      if (req.user) {
        return res.json(true);
      } else {
        res.status(401).json({ error: 'Can not log in, check your user name and password!' });
      }
    },
    logout: function (req, res, next) {
      req.logout();
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        }
        res.clearCookie('connect.sid', { path: '/' });
        res.redirect('/');
      });
    },
    updateUser: function (req, res) {
      console.log('req.body:', req.body);
      db.User.update({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      }, {
        where: { id: req.params.id }
      }).then(result => {
        console.log(result);
        res.json(result);
      });
    },
    confirmAuth: function (req, res) {
      if (req.user) {
        return res.json(true);
      } else {
        return res.json(false);
      }
    },
    deleteUser: function(req, res) {
      db.User.destroy({ where: { id: req.params.id } }).then(() => {
        res.json(true);
      }).catch(() => {
        res.json(false);
      });
    }
  };
};
