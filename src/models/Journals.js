import Sequelize from 'sequelize';
import sequelize from '../db'

class Journal extends Sequelize.Model {}
Journal.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,

    },
    publisher: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    worldOfScience: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    journalCitationResult: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    coverageArea: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }

},
 { sequelize, modelName: 'journal', });

sequelize.sync();

export default Journal;