module.exports = (passport, db) => {
  return {
    register: (req, res) => {
      if (!req.body.email || !req.body.password) {
        return res.json({ message: 'Email and Password required!' });
      }

      db.User.sync().then(() => {
        const newUser = {
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          userName: req.body.userName
        };

        return db.User.create(newUser).then((user) => {
          const userId = user.dataValues.userId
          const defaultTasks = [
            'Wash your face',
            'Brush your teeth',
            'Finish your homework',
            'Lay out your clothes for tomorrow',
            'Play outside',
            'Set your alarm for tomorrow morning',
            'Say something nice to your friends'
          ]
          const defaultTransactions = [1,6,13,20]
          db.Tasks.create({
            userId: userId,
            description: defaultTasks[0]
          }).then(()=>{
            db.Tasks.create({
              userId: userId,
              description: defaultTasks[1]
            }).then(()=>{
              db.Tasks.create({
                userId: userId,
                description: defaultTasks[2]
              }).then(()=>{
                db.Tasks.create({
                  userId: userId,
                  description: defaultTasks[3]
                }).then(()=>{
                  db.Tasks.create({
                    userId: userId,
                    description: defaultTasks[4]
                  }).then(()=>{
                    db.Tasks.create({
                      userId: userId,
                      description: defaultTasks[5]
                    }).then(()=>{
                      db.Tasks.create({
                        userId: userId,
                        description: defaultTasks[6]
                      }).then(()=>{
                        // start transactions
                        db.SwagOwned.create({
                          swagId: defaultTransactions[0],
                          userId: userId
                        }).then(()=>{
                          db.SwagOwned.create({
                            swagId: defaultTransactions[1],
                            userId: userId
                          }).then(()=>{
                            db.SwagOwned.create({
                              swagId: defaultTransactions[2],
                              userId: userId
                            }).then(()=>{
                              db.SwagOwned.create({
                                swagId: defaultTransactions[3],
                                userId: userId
                              }).then(()=>{
                                res.status(200).json({ message: 'Registered successfully.' });
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        });
      }).catch((err) => {
        console.log(err);
        res.status(403).json({ error: 'Email already exists!' });
      });
    },
    login: (req, res, next) => {
      passport.authenticate('local', (err, user) => {
        if (err) {
          return next(err);
        }
        if (user) {
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            return res.status(200).json({ loggedIn: true });
          });
        } else {
          res.json({ loggedIn: false, error: 'Can not log in, check your Username and Password!' });
        }
      })(req, res, next);
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
    updateUser: (req, res) => {
      // console.log('req.body:', req.body);
      db.User.update({
        email: req.body.email,
        firstName: req.body.firstName,
        userName: req.body.userName,
        password: req.body.password
      }, {
        where: { userId: req.params.userId }
      }).then(result => {
        // console.log(result);
        res.json(result);
      });
    },
    confirmAuth: (req, res) => {
      const userName = req.body.userName;
      const pwd = req.body.password;

      db.User.findOne({
        where: { userName: userName }
      }).then((user) => {
        if (!user) {
          return res.json(false);
        }
        if (!user.validPassword(pwd)) {
          return res.json(false);
        }
        return res.json(true);
      });
    },
    deleteUser: (req, res) => {
      db.User.destroy({
        where: { id: req.params.id }
      }).then(() => {
        res.json(true);
      }).catch(() => {
        res.json(false);
      });
    }
  };
};
