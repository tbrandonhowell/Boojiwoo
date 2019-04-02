module.exports = (sequelize, DataTypes) => {
  let SwagOwned = sequelize.define('SwagOwned', {
    recordId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    swagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  SwagOwned.associate = (db) => {
    SwagOwned.belongsTo(db.SwagStore, {
      foreignKey: 'swagId'
    });
  };
  return SwagOwned;
};