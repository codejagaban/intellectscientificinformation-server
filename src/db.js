import Sequelize from 'sequelize';
import mysql2 from 'mysql2'; // Needed to fix sequelize issues with WebPack
require('dotenv').config();


 const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
    })
    // check the database connection
sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(err => console.error('Unable to connect to the database:', err));

export default sequelize;