import Sequelize from 'sequelize';
import sequelize from '../db'

class Admin extends Sequelize.Model {}
Admin.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false

},
    avatar: {
        type: Sequelize.STRING,
    },


},
 { sequelize, modelName: 'user', });

sequelize.sync()

    export default Admin;