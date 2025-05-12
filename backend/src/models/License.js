const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // adjust path to your Sequelize instance

// Define the License model to store license keys and their status
const License = sequelize.define('License', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, 
    allowNull: false
  },
  license_key: {
    type: DataTypes.STRING(19),
    allowNull: false,
    unique: true,
    // Validate format AAAA-BBBB-CCCC-DDDD (alphanumeric groups of 4 separated by dashes)
    validate: {
      isLicenseFormat(value) {
        const format = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        if (!format.test(value)) {
          throw new Error('Invalid license key format');
        }
      }
    }
  },
  license_type: {
    type: DataTypes.ENUM('system', 'feature', 'subscription'),
    allowNull: false,
    defaultValue: 'system'  // default license type
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true         // only used for subscription licenses
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false     // license is unused until a user registers with it
  }
}, {
  timestamps: false  // include createdAt/updatedAt for auditing if needed
});

module.exports = License;
