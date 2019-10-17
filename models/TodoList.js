module.exports = (sequelize, Sequelize) => {
    const todoList = sequelize.define('todo_list', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: Sequelize.STRING,
        description: Sequelize.STRING
    });

    return todoList;
}