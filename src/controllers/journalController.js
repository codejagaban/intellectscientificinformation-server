import express from 'express';
import Journal from '../models/Journals';
import Sequelize from 'sequelize';

const Op = Sequelize.Op; //DB Operator

export const addNewJournal = async(req, res, next) => {



    const  { title, publisher, issn, e_issn, journalPrimaryLang, journalSecondaryLang, journalHomePageUrl, worldOfScience, journalCitationResult, coverageArea, journalCountry, journalFrequency, journalFirstYear, journalReviewLastYear,
    journalRecentIssue, journalPeerPolicy, editorialName, editorialPhone, editorialEmail, editorialJobTitle, publisherCountry, publisherAddress, publicationModel, publicationOwner, journalConjunction } = req.body;


    try {
        let journal = await Journal.findOne({
            where: {
            [Op.or]:
            [{title},
            {issn}]
        }
    });

        const newJournal = new Journal({ title, publisher, issn, e_issn, journalPrimaryLang, journalSecondaryLang, journalHomePageUrl, worldOfScience, journalCitationResult, coverageArea, journalCountry, journalFrequency, journalFirstYear, journalReviewLastYear,
            journalRecentIssue, journalPeerPolicy, editorialName, editorialPhone, editorialEmail, editorialJobTitle, publisherCountry, publisherAddress, publicationModel, publicationOwner, journalConjunction })



        journal ?  res.status(400).json({errors: [{msg: 'A journal with this title or ISSN already exists in our journal collection'}]}) :


            await newJournal.save();

            res.status(201).json({
                msg: ' New Journal created successfully'
            })



    } catch (err) {
        res.status(500).json({err})

    }




}


export const getAllJournals = async(req, res, next) => {
    Journal.findAll()
    .then(journals => {
        res.status(200).json({journals})
    })

    .catch(err => {
        res.status(500).json({err})
    })

}


export const searchJournal = async (req, res, next) => {

    // First implement the pagination


    // Declaring variable

    const page = req.params.page || 0; // Page
    const pageSize = req.params.pageSize || 10;

        // Declaring query based/search variables
       const  search = req.params.search || '1234';

    const journalPrimaryLang = req.body.journalPrimaryLang || '';
    const journalCountry = req.body.journalCountry || '';
    const journalFrequency = req.body.journalFrequency || '';
    const coverageArea = req.body.coverageArea || '';
    const journalPeerPolicy = req.body.journalPeerPolicy || ''



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
           res.status(200).json({
              journal,
              currentPage: page,
           })
       })
       .catch(err =>{
           res.status(500).json( {err});
           console.log(err);

           next()

       })

}


export const getJournalByID = (req, res, next) => {
    const id  = req.params.id;

    Journal.findOne({
        where: { id }
    })
    .then(journal => {
        console.log(journal)
        if (journal === null) {
            res.status(404).json({ msg: 'Journal Not Found' })
        } else {
            res.status(200).json({ journal })
        }
    })


    .catch(err => {
        console.log(err)
        res.status(500).json({err})
    })


}

