const { sequelize } = require("../models");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('recruitments', 'amount', {
                type: Sequelize.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn('recruitments', 'gender', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('recruitments', 'amount'),
            queryInterface.removeColumn('recruitments', 'gender')
        ])
    }
};