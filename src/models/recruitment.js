'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recruitment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recruitment.belongsTo(models.Company,{foreignKey:'companyId'})
    }
  };
  Recruitment.init({
    employerId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    position: DataTypes.STRING,
    field: DataTypes.STRING,
    jobDescriptionMarkdown: DataTypes.STRING,
    jobDescriptionHTML: DataTypes.STRING,
    workLocation: DataTypes.STRING,
    yearOfExperience: DataTypes.STRING,
    salary: DataTypes.STRING,
    endDate: DataTypes.STRING,
    public:DataTypes.STRING,

    amount:DataTypes.STRING,
    gender:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Recruitment',
  });
  return Recruitment;
};