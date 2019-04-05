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
        // get tasks for user
        let tomorrow = new Date();
        tomorrow.setTime(tomorrow.getTime() + 86500000);
        tomorrow.setHours(0, 0, 0, 0);
        // database call
        db.Tasks.findAll({
          where: {
            userId: req.session.passport.user.userId,
            dueNext: {
              $lt: tomorrow
            }
          }
        }).then((tasks) => {
          // render page
          res.render('tasks', {user: user, tasks: tasks});
        });
      } else {
        res.render('login');
      }
    },
    store: (req,res) => {
      if (req.isAuthenticated()) {
          const user = {
          user: req.user,
          isloggedin: req.isAuthenticated()
        };
        //
        // get most recent user data
        db.User.findOne({
          where: {
            userId: user.user.userId
          }
        }).then((user)=>{
          user = {
            user: user
          }
          const userId = user.user.userId
          //
          // get all swag
          db.SwagStore.findAll({
          }).then((swagStore)=>{
            //
            // get rid of all the data we don't need
            const swag = []
            for (let i in swagStore) {
              let s = swagStore[i].dataValues
              let temp = {
                swagId: s.swagId,
                swagType: s.swagType,
                description: s.description,
                fileName: s.fileName,
                pointCost: parseInt(s.pointCost)
              }
              swag.push(temp)
            }
            //
            // get all transactions involving this user
            db.SwagOwned.findAll({
              where: {
                userId: userId
              }
            }).then((trxn)=>{
              //
              //  Function Farm
              const prepTransactions = (trxn) => {
                let ownedSwag = []
                for (let i in trxn) {
                  let t = trxn[i].dataValues
                  if (t.userId = userId) {
                    ownedSwag.push(t.swagId)
                  }
                }
                return ownedSwag
              }
              const isOwned = (id,list) => {
                if (list.indexOf(id) === -1) {
                  return false
                } else {
                  return true
                }
              }
              const firstInstanceOfType = (i,list) => {
                if (list.indexOf(i) === -1) {
                  list.push(i)
                  return true
                } else {
                  return false
                }
              }
              const canUserAffordThis = (owned,cost) => {
                if (!owned && points >= cost) {
                  return true
                } else {
                  return false
                }
              }
              const getSmallIconFileName = (fileName) => {
                fileName = fileName.split('.')
                return fileName[0] + '-icon.' + fileName[1]
              }
              const isType = (i,type) => {
                return i === type
              }
              //
              //  Loop
              const ownedSwag = prepTransactions(trxn)
              const foundTypes = []
              const points = user.user.points
              for (let i in swag) {
                let s = swag[i]
                s.userPoints = points
                s.owned = isOwned(s.swagId,ownedSwag)
                s.firstOfType = firstInstanceOfType(s.swagType,foundTypes)
                s.displayPath = getSmallIconFileName(s.fileName)
                s.isBody = isType(s.swagType,'body')
                s.isEyes = isType(s.swagType,'eyes')
                s.isMouth = isType(s.swagType,'mouth')
                s.isOutfit = isType(s.swagType,'outfit')
                s.canAfford = canUserAffordThis(s.owned,s.pointCost)
              }
              //  done
              res.render('store', {user: user, swag: swag})
            })
          })
        })
      } else {
        res.render('login');
      }
    }
  };
};