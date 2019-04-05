const db = require('../models');
const HtmlController = require('./htmlController')

module.exports = function () {
  return {
    getData: (req, res) => {
      res.json({
        data: {
          name: 'sample',
          message: 'you should see this only if you are logged in.'
        }
      });
    },
    newTask: (req, res) => {
      db.Tasks.create({
        userId: req.session.passport.user.userId,
        description: req.body.description
      }).then((confirm) => {
        res.status(200).json({ confirm: confirm });
      });
    },
    updateTask: (req, res) => {
      db.Tasks.update({
        description: req.body.description,
        dueNext: req.body.dueNext,
        frequency: req.body.frequency,
        points: req.body.points
      }, {
        where: {
          taskId: req.params.taskId
        }
      }).then((confirm) => {
        res.status(200).json(confirm);
      });
    },
    completeTask: (req, res) => {
      // get only userId and taskId - server should do everything else
      const userId = req.session.passport.user.userId;
      const taskId = req.params.taskId;

      // get user points
      db.User.findOne({
        where: { userId: userId }
      }).then((user) =>{
        const userPoints = parseInt(user.points);
        // get task data
        db.Tasks.findOne({
          where: { taskId: taskId }
        }).then((task) => {
          // update user points
          const newPoints = userPoints + parseInt(task.points);
          db.User.update({
            points: newPoints
          }, {
            where: { userId: userId }
          }).then((updatedUser) => {
            // calculate new due date
            const freq = task.frequency;
            let today = new Date();
            let dueNext = new Date(today.setTime(today.getTime() + freq * 86400000));
            dueNext.setHours(0,0,0,0);

            // update task date
            db.Tasks.update({
              dueNext: dueNext
            }, {
              where: { taskId: taskId }
            }).then((updatedTask) => {
              res.status(200).json({ user: updatedUser, task: updatedTask });
            });
          });
        });
      });
    },
    getTasks: (req, res) => {
      // get value for tomorrow
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
        res.status(200).json(tasks);
      });
    },
    deleteTask: (req, res) => {
      db.Tasks.destroy({
        where: {
          taskId: req.params.taskId
        }
      }).then((confirm) => {
        res.status(200).json(confirm)
      });
    },
    getSwag: (req, res) => {
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
      }).then((confirm) => {
        res.status(200).json(confirm);
      });
    },
    updateAvatar: (req, res) => {
      userId = req.session.passport.user.userId;
      cmd = req.params.cmd
      cmd = cmd[0].toLowerCase()
      if (cmd === 'b') {        // body call

        db.User.update({
          avatarColor: req.body.filePath // BH tweak
        }, {
          where: {
            userId: req.session.passport.user.userId
          }
        }).then((confirm) => {
          req.session.passport.user.avatarColor = req.body.filePath; // BH addition
          res.status(200).json(confirm);
        });
      } else if (cmd === 'e') { // eye call
        console.log("\n\n\ncaught a eye post\n\n\n");
        db.User.update({
          avatarEyes: req.body.filePath, // BH tweak
        }, {
          where: {
            userId: req.session.passport.user.userId
          }
        }).then((confirm) => {
          req.session.passport.user.avatarEyes = req.body.filePath; // BH addition
          res.status(200).json(confirm);
        });
      } else if (cmd === 'm') { // mouth call
        db.User.update({
          avatarMouth: req.body.filePath, // BH tweak
        }, {
          where: {
            userId: req.session.passport.user.userId
          }
        }).then((confirm) => {
          req.session.passport.user.avatarMouth = req.body.filePath; // BH addition
          res.status(200).json(confirm);
        });
      } else if (cmd === 'o') { // outfit call

        db.User.update({
          avatarHat: req.body.filePath // BH tweak
        }, {
          where: {
            userId: req.session.passport.user.userId
          }
        }).then((confirm) => {
          req.session.passport.user.avatarHat = req.body.filePath; // BH addition
          res.status(200).json(confirm);
        });
      }
    },
    purchaseSwag: function (req, res) {
      // swagId & userId lines might not be right
      const swagId = req.params.swagId;
      const userId = req.session.passport.user.userId;
      db.SwagOwned.create({
        swagId: swagId,
        userId: userId
      }).then((confirm) => {
        // callback
        db.SwagStore.findOne({
          where: {swagId: swagId}
        }).then((swag)=>{
          const cost = swag.pointCost
          db.User.findOne({
            where: {userId: userId}
          }).then((user)=>{
            const updatedPoints = user.points - cost
            db.User.update({
              points: updatedPoints
            }, {
              where: {
                userId: userId
              }
            }).then((confirm)=>{
              // req.session.passport.user.points = updatedPoints
              db.User.findOne({
                where: {
                  userId: userId
                }
              }).then((user)=>{
                res.status(200).json(user)
              })
            })
          })
        })
      });
    },
  };
};
