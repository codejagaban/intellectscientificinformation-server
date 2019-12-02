import Sequelize from 'sequelize';
import sequelize from '../db';


class Journal extends Sequelize.Model {}
Journal.init({
    // Journal Info
    id: {
        type: Sequelize.INTEGER,
        allowNull ::

        primaryKey: : true,
        autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,

    },
     // Publisher's info
     publisher: {
        type: Sequelize.STRING,
    },
    issn : {
        type: Sequelize.STRING,
    },
    e_issn: {
        type: Sequelize.STRING,
    },
    journalCountry: {
        type: Sequelize.STRING,
    },

    journalPrimaryLang: {
        type: Sequelize.STRING,

    },

    journalSecondaryLang: {
        type: Sequelize.STRING,

    },

    journalHomePageUrl: {
        type: Sequelize.STRING,

    },
    journalFrequency: {
        type: Sequelize.STRING,

    },

    journalFirstYear: {
        type: Sequelize.STRING,

    },

    journalReviewLastYear: {
        type: Sequelize.STRING,
    },


    googleScholarH: {
        type: Sequelize.STRING,

    },


    journalRecentIssue: {
        type: Sequelize.STRING,
    },

    subjectCategory: {
        type: Sequelize.JSON,

    },
    coverageIndex: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    // editorial info
    editorialName: {
        type: Sequelize.STRING,

    },

    editorialEmail: {
        type: Sequelize.STRING,

    },
    editorialJobTitle: {
        type: Sequelize.STRING,

    },

    publisherCountry: {
        type: Sequelize.STRING,

    },
    publisherAddress: {
        type: Sequelize.STRING,

    },

    publicationModel: {
        type: Sequelize.STRING,

    },

    isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }

},
 { sequelize, modelName: 'journal', });
sequelize.sync();

export default Journal;