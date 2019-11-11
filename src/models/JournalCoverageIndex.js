import Sequelize from 'sequelize';
import sequelize from '../db'

class CoverageIndex extends Sequelize.Model {}
CoverageIndex.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    coverageIndex: {
        type: Sequelize.STRING,
        allowNull: false,
    },

},
 { sequelize, modelName: 'coverageIndex', });

sequelize.sync()

    export default CoverageIndex;