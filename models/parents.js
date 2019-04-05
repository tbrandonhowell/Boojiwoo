module.exports = (sequelize, DataTypes) => {
  let Parents = sequelize.define('Parents', {
    parentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0],
          msg: "Empty tasks are not allowed"
        }
      },
      allowNull: false
    }
  });
  return Parents;
};