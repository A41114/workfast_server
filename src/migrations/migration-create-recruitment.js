'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recruitments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employerId: {
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      field: {
        type: Sequelize.STRING
      },
      jobDescriptionMarkdown: {
        type: Sequelize.TEXT('long')
      },
      jobDescriptionHTML: {
        type: Sequelize.TEXT('long')
      },
      workLocation: {
        type: Sequelize.STRING
      },
      yearOfExperience: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.STRING
      },
      public: {
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
    await queryInterface.dropTable('recruitments');
  }
};