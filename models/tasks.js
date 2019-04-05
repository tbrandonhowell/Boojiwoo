module.exports = (sequelize, DataTypes) => {
    let Tasks = sequelize.define('Tasks', {
      taskId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      description: {
          type: DataTypes.STRING,
          validate: {
              len: {
                  args: [0],
                  msg: "Empty tasks are not allowed"
              }
          }
      },
      frequency: {
          type: DataTypes.INTEGER,
          defaultValue: 1
      },
      dueNext: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
      },
      points: {
          type: DataTypes.INTEGER,
          defaultValue: 1
      }
    });
    return Tasks;
  };