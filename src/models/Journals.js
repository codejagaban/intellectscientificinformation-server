import Sequelize from 'sequelize';
import sequelize from '../db';


class Journal extends Sequelize.Model {}
Journal.init({
    // Journal Info
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,

    },

    issn : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    e_issn: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    journalPrimaryLang: {
        type: Sequelize.STRING,
        allowNull: false,

    },

    journalSecondaryLang: {
        type: Sequelize.STRING,
        allowNull: true,

    },

    journalHomePageUrl: {
        type: Sequelize.STRING,
        allowNull: true,

    },
    issn : {
        type: Sequelize.STRING,
        allowNull: false,
    },


    journalCitationResult: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    journalCountry: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    journalFrequency: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    journalFirstYear: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    journalReviewLastYear: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    journalRecentIssue: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    journalPeerPolicy: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    coverageArea: {
        type: Sequelize.JSON,
        allowNull: false,
    },
    impactFactor: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    // editorial info
    editorialName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    editorialPhone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    editorialEmail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    editorialJobTitle: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    // Publisher's info
    publisher: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    publisherCountry: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    publisherAddress: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    publicationModel: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    publicationOwner: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    journalConjunction: {
        type: Sequelize.STRING,
        allowNull: true ,
    },



    isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }

},
 { sequelize, modelName: 'journal', });
sequelize.sync();

export default Journal;