import { DataTypes } from 'sequelize';
import connection from '../db/mysql-conntection.js';

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
})
 
connection.sync();

export default User; 

