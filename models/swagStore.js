module.exports = (sequelize, DataTypes) => {
    let SwagStore = sequelize.define('SwagStore', {
      swagId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      swagType: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
          type: DataTypes.STRING,
          allowNull: false
      },
      fileName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      pointCost: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 60
      }
    });
    return SwagStore;
  };