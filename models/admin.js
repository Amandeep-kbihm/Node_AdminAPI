'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};