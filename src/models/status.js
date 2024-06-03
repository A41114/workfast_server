'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Status.init({
    recruitmentId: DataTypes.INTEGER,
    
    candidateId: DataTypes.STRING,
    cvName: DataTypes.STRING,
    image: DataTypes.BLOB,
    fullName: DataTypes.STRING,
    position: DataTypes.STRING,
    dayOfBirth: DataTypes.STRING,
    gender: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    goals: DataTypes.STRING,
    skills: DataTypes.STRING,
    hobbies:DataTypes.STRING,

    education:DataTypes.STRING,    
    experience:DataTypes.STRING,
    activities: DataTypes.STRING,
    certificate: DataTypes.STRING,
    awards: DataTypes.STRING,
    moreInf: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};