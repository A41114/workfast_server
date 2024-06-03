const { sequelize } = require("../models");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('companies', 'license', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            }),
            queryInterface.addColumn('companies', 'status', {
                type: Sequelize.STRING,
                allowNull: true,
            }),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('companies', 'license'),
            queryInterface.removeColumn('companies', 'status')
        ])
    }
};