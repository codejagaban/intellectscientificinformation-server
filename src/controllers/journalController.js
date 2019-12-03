
import Journal from '../models/Journals';
import Sequelize from 'sequelize';
import moment from 'moment';

const Op = Sequelize.Op; //DB Operator

export const addNewJournal = async(req, res, next) => {



    const  { title, publisher, issn, e_issn, journalPrimaryLang, journalSecondaryLang, journalHomePageUrl,
          subjectCategory, coverageIndex, journalCountry, journalFrequency, journalFirstYear, journalReviewLastYear,
    journalRecentIssue, editorialName,googleScholarH, editorialPhone, editorialEmail, editorialJobTitle, publisherCountry, publisherAddress, publicationModel, isApproved } = req.body;



    Journal.findOne({
        where: {
            [Op.or]:
            [{title},
            {issn}],
            [Op.and]: [
                coverageIndex
            ]
        }
    })

    .then(journal => {
        if(journal) {
            res.status(400).json({errors: [{msg: 'A journal with this title or ISSN already exists in our journal collection'}]})

        }
        else {
            const newJournal = new Journal({ title, publisher, issn, e_issn, journalPrimaryLang, journalSecondaryLang, journalHomePageUrl,
                //  worldOfScience,

                  subjectCategory, coverageIndex, journalCountry, journalFrequency, journalFirstYear, journalReviewLastYear, googleScholarH,
                journalRecentIssue, editorialName, editorialPhone, editorialEmail, editorialJobTitle,  isApproved, publisherCountry, publisherAddress, publicationModel,  })

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
  // Declaring pagination  variables
  const page =  parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const startIndex = ( page - 1 ) * limit
  const endIndex = page * limit;

    Journal.findAndCountAll({
        limit: limit,
        offset: startIndex
    })
    .then(journals => {
        if(!journals) {
            res.status(404).json({ msg: 'No journal found from the collection' })
        }

        else {
            const allJournals = {  }
            if(endIndex < journals.count) {
                allJournals.next = {
                    page: page + 1,
                    limit: limit
                }

            }
            if ( startIndex > 0 ) {
                allJournals.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            allJournals.currentPage = page;
               allJournals.journals = journals.rows;
               allJournals.totalCount = journals.count;
            res.status(200).json({
                result: allJournals
             })
        }
    })

    .catch(err => {
        console.log({ err })
        res.status(500).json({err})
        next()
    })

}

export const searchJournal = async (req, res) => {
    // First implement the pagination

    console.log(req.query)
    // Declaring pagination  variables
    const page =  parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = ( page - 1 ) * limit
    const endIndex = page * limit;

        // Declaring query based/search variables
       const  search = req.body.search || '';

    const journalPrimaryLang = req.body.journalPrimaryLang || null;
    const journalCountry = req.body.journalCountry || null;
    const journalFrequency = req.body.journalFrequency || null;


    // create a pagination Object

    //    create a search query based on inputs and querys from the user
       await Journal.findAndCountAll({
           where: {
            [Op.or]:
              [ {title: {   [Op.substring]: search}},
              {issn: {   [Op.substring]: search}},
            
            {journalCountry: {[Op.substring]: journalCountry}},
             {journalFrequency: {[Op.substring]: journalFrequency }},
             {journalPrimaryLang: {[Op.substring]: journalPrimaryLang }},

            ],
           },
           attributes: { exclude: [ 'subjectCategory', 'journalReviewLastYear', 'journalSecondaryLang',
            'journalRecentIssue', 'editorialName','googleScholarH', 'editorialPhone', 'editorialEmail','journalFirstYear','editorialJobTitle','journalHomePageUrl'] },
           limit: limit,
           offset: startIndex

       })
       .then(journals => {
           if(journals.count === 0) {
               res.status(404).json({
                   msg: 'No Journal found in out collection'
               })
           }
           else {
            const searchResults = {  }

            if ( startIndex > 0 ) {
                searchResults.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            if(endIndex < journals.count) {
                searchResults.next = {
                    page: page + 1,
                    limit: limit
                }

            }

            searchResults.currentPage = page;
               searchResults.journals = journals.rows;
               searchResults.totalCount = journals.count;
            res.status(200).json({
                searchResults
             })
           }
       })
       .catch(err =>{
           res.status(500).json( {err});
           console.log({err});


       })

}


// get all pending journals needing approval from admin
export const pendingJournals = (req, res ) => {
      // Declaring pagination  variables
      const page =  parseInt(req.query.page)
      const limit = parseInt(req.query.limit)

      const startIndex = ( page - 1 ) * limit
      const endIndex = page * limit;


    Journal.findAndCountAll({
        where: { isApproved: false },
        limit: limit,
        offset: startIndex

    })
    .then(
        journals => {
            if(!journals || journals.count === 0) {
                res.status(404).json({ msg: 'There are currently no pending journals' })
            }
            else {
                const result = {  }

                if ( startIndex > 0 ) {
                    result.previous = {
                        page: page - 1,
                        limit: limit
                    }
                }
                if(endIndex < journals.count) {
                    result.next = {
                        page: page + 1,
                        limit: limit
                    }

                }

                result.currentPage = page;
                   result.journals = journals.rows;
                   result.totalCount = journals.count;
                res.status(200).json({
                    result
                 })
            }

    })

    .catch(err => {
        console.log({ err })
    res.status(500).json({ msg: 'Oops Something went wrong, please try again later' })


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



// get a specific journal by ID
export const getJournalById = (req, res) => {
    const id = req.params.id;
    Journal.findOne({
        where: { id }
    })
    .then(journal => {
        if(!journal) {
            res.status(404).json({ msg: 'Oops we couldn\'t get the journal you were looking for or it might have been deleted' })
        }
        else {
            res.status(200).json({ journal })
        }
    })

    .catch(err => {
        console.log({ err })
        res.status(500).json({ msg: 'Something went wrong, please  try again later' })

    })

}


export const editJournal = (req, res, ) => {
    const { title, publisher, issn, e_issn, journalPrimaryLang, journalSecondaryLang, journalHomePageUrl,
    subjectCategory, coverageIndex, journalCountry, journalFrequency, journalFirstYear, journalReviewLastYear,
journalRecentIssue, editorialName,googleScholarH, editorialPhone, editorialEmail, editorialJobTitle, publisherCountry, publisherAddress, publicationModel,} = req.body.newJournalDetails;
    const {id} = req.params;
    console.log(id)
    console.log(title)
    Journal.update({
        title,
        publisher,
        issn,
        e_issn,
        journalPrimaryLang,
        journalSecondaryLang,
        journalHomePageUrl,
        subjectCategory,
        coverageIndex, journalCountry,
        journalFrequency,
        journalFirstYear,
        journalReviewLastYear,
        journalRecentIssue,
        editorialName,
        googleScholarH,
        editorialPhone,
        editorialEmail,
        editorialJobTitle,
        publisherCountry,
        publisherAddress,
        publicationModel,},
        { where:  { id: id }}
 )
    .then(edittedJournal =>  {
    res.status(200).json( { msg: ' Journal editted successfully' } )
    })
    .catch(err => {
        res.status(500).json({ msg: err })
        console.log({ err })
        next()
    })
}



export const deleteJournal = (req, res, next) => {
    const id  = req.params.id;
    console.log(id)
    Journal.destroy({ where: {id} } )
    .then(destroyed => {
        res.status(200).json({ msg: 'Journal deleted successfully' })
    })
    .catch(err => {
        res.status(500).json({ msg: err })
    })
}





//Gets all the journals from the DB by a specific index

export const getJournalsByIndex = (req, res) => {

      // Declaring pagination  variables
      const page =  parseInt(req.query.page)
      const limit = parseInt(req.query.limit)

      const startIndex = ( page - 1 ) * limit
      const endIndex = page * limit;



    const  { coverageIndex }  = req.body;

    Journal.findAndCountAll({
        where: {
            coverageIndex : coverageIndex
        },
        offset: startIndex,
        limit: limit,
    })
    .then(journals => {
        if(journals.count === 0) {
            res.status(404).json({
                msg: 'No Journal found in this collection'
            })
        }
        else {
         const journalResults = {  }

         if ( startIndex > 0 ) {
             journalResults.previous = {
                 page: page - 1,
                 limit: limit
             }
         }
         if(endIndex < journals.count) {
             journalResults.next = {
                 page: page + 1,
                 limit: limit
             }

         }

         journalResults.currentPage = page;
            journalResults.journals = journals.rows;
            journalResults.totalCount = journals.count;
         res.status(200).json({
             journalResults
          })
        }
    })
    .catch(err =>{
        res.status(500).json( {err});
        console.log({err});


    })


}