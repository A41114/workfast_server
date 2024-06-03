'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cvs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      candidateId: {
        type: Sequelize.STRING
      },
      cvName: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.BLOB('long')
      },
      fullName: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      dayOfBirth: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      phonenumber: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      goals: {
        type: Sequelize.TEXT('long')
      },
      skills: {
        type: Sequelize.TEXT('long')
      },
      hobbies: {
        type: Sequelize.TEXT('long')
      },


      education: {
        type: Sequelize.TEXT('long')
      },
      experience: {
        type: Sequelize.TEXT('long')
      },
      activities: {
        type: Sequelize.TEXT('long')
      },
      certificate: {
        type: Sequelize.TEXT('long')
      },
      awards: {
        type: Sequelize.TEXT('long')
      },
      moreInf: {
        type: Sequelize.TEXT('long')
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
    await queryInterface.dropTable('cvs');
  }
};