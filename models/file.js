import { DataTypes } from 'sequelize';
import connection from '../db/mysql-conntection.js';
import User from './user.js';

const File = connection.define('Files', {
    file_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
})

File.belongsTo(User, {
    foreignKey: 'user_id',
});
 
connection.sync();

export default File; 

