const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('User', {
    // userId: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true
    // },
    // parentId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // userName: {
    //   type: DataTypes.STRING
    // },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: {
        args: true,
        msg: 'Email already exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // points: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0
    // },
    // avatarColor: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0
    // },
    // avatarEyes: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0
    // },
    // avatarMouth: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0
    // },
    // avatarHat: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0
    // },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    // keeping this below for possible later use
    // isAdmin: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  }, {
    timestamps: true,
    hooks: {
      beforeValidate: function (user) {
        if (user.changed('password')) {
          return bcrypt.hash(user.password, 10).then((password) => {
            user.password = password;
          });
        }
      }
    }
  });

  // This will check if an unhashed password can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Compares passwords
  User.prototype.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, (error, isMatch) => {
      if (error) {
        return callback(error);
      }
      return callback(null, isMatch);
    });
  };

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  return User;
};
