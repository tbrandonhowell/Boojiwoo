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
          user: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // get swag & return w/ owned(t/f) field
        db.SwagStore.findAll({
          attributes: [
            'swagId', 'swagType', 'description', 'fileName', 'pointCost',
            [db.sequelize.literal('CASE WHEN NULLIF(swagOwneds.userId,\'\') IS NULL THEN false ELSE true END'), 'owned']
          ],
          include: [{
            model: db.SwagOwned,
            required: false,
            where: {
              userId: req.session.passport.user.userId
            }
          }]
        }).then((swagStore)=>{

          /*
              Start Returned Data
              ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
          */

          //
          //  Function Farm
          //
          const isType = (i,type) => {
            return i === type
          }
          const firstInstanceOfType = (i,list) => {
            if (list.indexOf(i) === -1) {
              list.push(i)
              return true
            } else {
              return false
            }
          }
          const canUserAffordThis = (s,points) => {
            if (isOwned(s.owned) || s.pointCost > points) {
              return false
            } else {
              return true
            }
          }
          const isOwned = (i) => {
            return i === 1
          }
          const getSmallIconFileName = (fileName) => {
            fileName = fileName.split('.')
            return fileName[0] + '-icon.' + fileName[1]
          }
          //
          //  External Loop Variables
          //
          const foundTypes = []
          const swag = []

          //
          //  Loop
          //
          for (let i in swagStore) {
            const s = swagStore[i].dataValues
            const item = {
              swagId: s.swagId,
              swagType: s.swagType,
              description: s.description,
              fileName: s.fileName,
              pointCost: s.pointCost,
              userPoints: user.user.points,
              owned: isOwned(s.owned),
              displayPath: getSmallIconFileName(s.fileName),
              firstOfType: firstInstanceOfType(s.swagType,foundTypes),
              isBody: isType(s.swagType,'body'),
              isEyes: isType(s.swagType,'eyes'),
              isMouth: isType(s.swagType,'mouth'),
              isOutfit: isType(s.swagType,'outfit'),
              canAfford: canUserAffordThis(s,user.user.points)
            }
            swag.push(item)
            console.log(item)
          }
          res.render('store', {user: user, swag: swag});
        })
      } else {
        res.render('login');
      }
    }
  };
};