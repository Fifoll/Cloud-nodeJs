const { DataTypes } = require('sequelize');
const connection = require('../db/mysql-conntection.js');

const User = connection.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false
    }
}, {
    timestamps: false
});

connection.sync();

module.exports = User;
