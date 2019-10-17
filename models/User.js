module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: {
            type:Sequelize.STRING,
            allowNull: false,
            }
    });

    return user;
}