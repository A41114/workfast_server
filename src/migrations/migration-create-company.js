'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyName: {
        type: Sequelize.STRING
      },
      companyDescriptionMarkdown: {
        type: Sequelize.TEXT('long')
      },
      companyDescriptionHTML: {
        type: Sequelize.TEXT('long')
      },
      companyImage: {
        type: Sequelize.BLOB('long')
      },
      companyLocation: {
        type: Sequelize.STRING
      },
      companyIndustry:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companies');
  }
};