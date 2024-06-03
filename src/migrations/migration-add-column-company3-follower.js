const { sequelize } = require("../models");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('companies', 'follower', {
                type: Sequelize.STRING,
                allowNull: true,
            }),
        ])
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('companies', 'follower')
        ])
    }
};