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
    username: {
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
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }



},
 { sequelize, modelName: 'admin', });

sequelize.sync()

    export default Admin;