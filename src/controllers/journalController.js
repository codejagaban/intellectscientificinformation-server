import express from 'express';
import Journal from '../models/Journals';
import Sequelize from 'sequelize';
import moment from 'moment';

const Op = Sequelize.Op; //DB Operator

export const addNewJournal = async(req, res, next) => {



    const  { title, publisher, issn, e_issn, journalPrimaryLang, journalSecondaryLang, journalHomePageUrl,
        //  worldOfScience,
          journalCitationResult, coverageArea, journalCountry, journalFrequency, journalFirstYear, journalReviewLastYear,
    journalRecentIssue, journalPeerPolicy, editorialName,impactFactor, editorialPhone, editorialEmail, editorialJobTitle, publisherCountry, publisherAddress, publicationModel, publicationOwner, journalConjunction, isApproved,  userId } = req.body;



    Journal.findOne({
        where: {
            [Op.or]:
            [{title},
            {issn}]
        }
    })

    .then(journal => {
        if(journal) {
            res.status(400).json({errors: [{msg: 'A journal with this title or ISSN already exists in our journal collection'}]})

        }
        else {
            const newJournal = new Journal({ title, publisher, issn, e_issn, journalPrimaryLang, journalSecondaryLang, journalHomePageUrl,
                //  worldOfScience,
                  journalCitationResult, coverageArea, journalCountry, journalFrequency, journalFirstYear, journalReviewLastYear, impactFactor,
                journalRecentIssue, journalPeerPolicy, editorialName, editorialPhone, editorialEmail, editorialJobTitle,  isApproved, publisherCountry, publisherAddress, publicationModel, publicationOwner, journalConjunction, userId })

             newJournal.save();

            res.status(201).json({
                msg: ' New Journal created successfully'
            })

        }
    })

    .catch(err => {
        res.status(500).json({err})
        console.log({ err })

    })






}


export const getAllJournalsCount = async(req, res, next) => {
    Journal.findAndCountAll()
    .then(journals => {
        res.status(200).json({ journalsCount: journals.count})
    })

    .catch(err => {
        res.status(500).json({err})
    })

}

export const getAllJournals = (req, res, next) => {
    const page = Number(req.params.page);
    const pageSize = 10;
    const paginate = ({ page, pageSize }) => {
        const offset = page * pageSize;
        const limit = offset + pageSize

        return {
          offset,
          limit,
        }
       }




    Journal.findAndCountAll({
        ...paginate({ page, pageSize }),
    })
    .then(journals => {
        if(!journals) {
            res.status(404).json({ msg: 'No journal found from the collection' })
        }

        else {
        res.status(200).json({
             journalsCount: journals.count,
            //  prevPage: page === 0 ? null : page -1,
            //     currentPage: page,
            //     nextPage: (journals.count / pageSize) < 0 ? null : page + 1,
            //     lastPage: (journals.count / pageSize) < 0 ? (journals.count / pageSize) -1 : null,
                journals: journals.rows,})
        }
    })

    .catch(err => {
        console.log({ err })
        res.status(500).json({err})
        next()
    })

}

export const searchJournal = async (req, res, next) => {
    // First implement the pagination


    // Declaring variable

    const page = Number(req.params.page); // Page
    const pageSize = Number(req.params.pageSize) || 5;

        // Declaring query based/search variables
       const  search = req.params.search || '1234';

    const journalPrimaryLang = req.body.journalPrimaryLang || '';
    const journalCountry = req.body.journalCountry || '';
    const journalFrequency = req.body.journalFrequency || '';
    const coverageArea = req.body.coverageArea || '';
    const journalPeerPolicy = req.body.journalPeerPolicy || '';



       const paginate = ({ page, pageSize }) => {
        const offset = page * pageSize;
        const limit = offset + pageSize

        return {
          offset,
          limit,
        }
       }


    //    create a search query based on inputs and querys from the user
       await Journal.findAndCountAll({
           where: {
            [Op.or]:
              [ {title: {   [Op.substring]: search}},
              {coverageArea: {   [Op.substring]: search}},
              {issn: {   [Op.substring]: search}},
             ],
             [Op.and]:
             [
            {journalCountry: {[Op.substring]: journalCountry}},
             {journalFrequency: {[Op.substring]: journalFrequency }},
             {journalPrimaryLang: {[Op.substring]: journalPrimaryLang }},
             {coverageArea: {[Op.substring]: coverageArea }},
             {journalPeerPolicy: {[Op.substring]: journalPeerPolicy }}

            ]
           },
           ...paginate({ page, pageSize }),



       })
       .then(journal => {
           if(journal.count === 0) {
               res.status(404).json({
                   msg: 'No Journal found in out collection'
               })
           }
           else {
            res.status(200).json({
                totalJournals: journal.count,
              //   totalPageSize: ,
                prevPage: page === 0 ? null : page -1,
                currentPage: page,
                nextPage: (journal.count / pageSize) -1 < page + 1 ? null : page + 1,
                lastPage: (journal.count / pageSize) < 0 ? (journal.count / pageSize) -1 : null,
                journals: journal.rows,

             })
           }
       })
       .catch(err =>{
           res.status(500).json( {err});
           console.log({err});

           next()

       })

}


export const getJournalByID = (req, res, next) => {
    const id  = req.params.id;

    Journal.findOne({
        where: { id }
    })
    .then(journal => {
        if (journal === null) {
            res.status(404).json({ msg: 'Journal Not Found' })
        } else {
            res.status(200).json({ journal })
        }
    })


    .catch(err => {
        console.log({err})
        res.status(500).json({err})
    })


}


// get all pending journals needing approval from admin
export const pendingJournals = (req, res, next ) => {
    Journal.findAndCountAll({
        where: {
            isApproved : false
        }
    })
    .then(journals => {
        res.status(200).json({ pendingJournals: journals.rows, pendingJournalsCount: journals.count })
    })

    .catch(err => {
        console.log({ err })
    res.status(500).json({ msg: err })

    next()

    })
}


//get journals submitted for the month
export const getMonthlyJournal = (req, res) => {
    const now = new Date();

    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    Journal.findAndCountAll({
        where: {
            [Op.and] :
            [ {createdAt : {[Op.substring] : `${thisYear}-${thisMonth + 1}`}},
         ]

        }
    })

    .then(monthlyJournal => {
        res.status(200).json({ totalMonthlyJournalCount: monthlyJournal.count })
    })

    .catch(err => {
        console.log({err})
        res.status(500).json({ msg: err })
        next()
    })
}




// get most recent  5 journals submitted
export const mostRecentJournals = (req, res) => {
    const now = moment().format()

    const lastFive = moment().subtract(5, 'days');
    Journal.findAndCountAll({
        where: {
                createdAt: {
                    [Op.between] : [ lastFive, now ]
                }
            }
    })

    .then(mostRecent => {
        res.status(200).json({ mostRecentJournals: mostRecent.rows })
    })

    .catch(err => {
        console.log({err})
        res.status(500).json({ msg: err })
    })
}


// get all the journals for the year and group them by their month
export const getYearlyJournals = (req, res ) => {

    // const yearMonth = Sequelize.literal('EXTRACT(YEAR_MONTH FROM `createdAt`) ');
    const currentYear = moment().format('YYYY')
    const yearMonth = Sequelize.literal(`DATE_FORMAT(createdAt, "%${currentYear}-%m")`);
Journal.findAndCountAll({
    // where: {
    //     createdAt: yearMonth
    // },
    // attributes: [yearMonth, [Sequelize.fn('count', Sequelize.col('createdAt')), 'journalCount', ]  ],
    // attributes: { yearMonth },
    group: [yearMonth],
})
.then(result => {

    res.status(200).json({ yearlyJournals: result.count })
})
.catch(err => {
    console.log({ err })
    res.status(500).json({ msg: err })
})
}