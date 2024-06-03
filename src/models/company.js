'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Recruitment, {foreignKey:'companyId'})
    }
  };
  Company.init({
    companyName: DataTypes.STRING,
    companyDescriptionMarkdown: DataTypes.TEXT,
    companyDescriptionHTML: DataTypes.TEXT,
    companyImage: DataTypes.BLOB,
    companyLocation: DataTypes.STRING,
    companyIndustry: DataTypes.STRING,
    size: DataTypes.STRING,
    address: DataTypes.STRING,
    license: DataTypes.BLOB,
    status: DataTypes.STRING,
    follower : DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};