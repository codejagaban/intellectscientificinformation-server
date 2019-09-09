import Sequelize from 'sequelize';
import sequelize from '../db'

class CoverageArea extends Sequelize.Model {}
CoverageArea.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    coverageArea: {
        type: Sequelize.STRING,
        allowNull: false,
    },

},
 { sequelize, modelName: 'coverageArea', });

sequelize.sync()

    export default CoverageArea;