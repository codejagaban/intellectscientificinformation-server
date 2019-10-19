import Sequelize from 'sequelize';
import sequelize from '../db'

class User extends Sequelize.Model {}
User.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
  },
  jobTitle: {
    type: Sequelize.STRING,
    allowNull: false,
},
  password: {
    type: Sequelize.STRING,
    allowNull: false

},

isAdmin: {
  type: Sequelize.BOOLEAN,
  defaultValue: false
},
},
 { sequelize, modelName: 'user', });

sequelize.sync()

    export default User;