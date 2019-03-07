var express = require('express');
var router =  express.Router();

const sequelize = new Sequelize('sequelize_root', 'root', 'root', {
    host: 'localhost',
    // dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
    dialect: 'mysql',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });