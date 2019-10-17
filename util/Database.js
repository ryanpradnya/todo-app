const Sequelize = require('sequelize');

const config = require('./Config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    host: config.host
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/User')(sequelize, Sequelize);
db.todolist = require('../models/TodoList')(sequelize, Sequelize);

db.todolist.belongsTo(db.user, { constraints: true, onDelete: 'CASCADE' });
db.user.hasMany(db.todolist);

module.exports = db;


