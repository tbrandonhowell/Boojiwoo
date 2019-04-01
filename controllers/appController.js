const db = require('../models');

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
        userId: req.body.userId,
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
          taskId: req.body.taskId
        }
      }).then((confirm) => {
        res.status(200).json(confirm);
      });
    },
    completeTask: (req, res) => {
      // get only userId and taskId - server should do everything else
      const userId = req.body.userId;
      const taskId = req.body.taskId;

      // get user points
      db.User.findOne({
        where: { userId: userId }
      }).then((user) =>{
        const userPoints = user.points;
        // get task data
        db.Tasks.findOne({
          where: { taskId: taskId }
        }).then((task) => {

          // update user points
          const newPoints = userPoints + task.points;
          db.User.update({
            points: newPoints
          }, {
            where: { userId: userId }
          }).then((updatedUser) => {

            // calculate new due date
            const freq = task.frequency;
            let today = new Date()
            const dueNext = new Date(today.setTime(today.getTime() + freq * 86400000));

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
      tomorrow.setHours(0,0,0,0);
      // database call
      db.Tasks.findAll({
        where: {
          userId: req.body.userId,
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
          taskId: req.body.taskId
        }
      }).then((confirm) => {
        res.status(200).json(confirm)
      });
    },
    purchaseSwag: (req, res) => {
      // swagId & userId lines might not be right
      const swagId = req.body.swagId;
      const userId = req.body.userId;
      db.SwagOwned.create({
        swagId: swagId,
        userId: userId
      }).then((confirm) => {
        // callback
        res.status(200).json({ updated: true, confirm: confirm });
      });
    },
    getSwag: (req, res) => {
      /*
        Send back from the swagStore a list of all swag in the following format
          {
            swagType: 'type',
            descrpiton: '',
            fileName: 'filename.png',
            pointCost: 1,
            owned: true/false
          }
      */
      db.SwagStore.findAll({
        attributes: [
          'swagId', 'swagType', 'description', 'fileName', 'pointCost',
          [db.sequelize.literal('CASE WHEN NULLIF(swagOwneds.userId,\'\') IS NULL THEN false ELSE true END'), 'owned']
        ],
        include: [{
          model: db.SwagOwned,
          required: false,
          where: {
            userId: req.body.userId
          }
        }]
      }).then((confirm) => {
        res.status(200).json(confirm);
      });
    },
    updateAvatar: (req, res) => {
      db.User.update({
        avatarColor: req.body.avatarColor,
        avatarEyes: req.body.avatarEyes,
        avatarMouth: req.body.avatarMouth,
        avatarHat: req.body.avatarHat
      }, {
        where: {
          userId: req.body.userId
        }
      }).then((confirm) => {
        res.status(200).json(confirm);
      });
    }
  };
};
