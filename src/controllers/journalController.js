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
            console.log(req.body);



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
    const pageSize = req.params.pageSize || 5;
    const search = {
        // title: 'First',
        coverageArea: 'zoology',
        // journalCountry: 'United states',
        // issn: '1234'

    }
        // Declaring query based/search variables
       const {title, coverageArea , issn,  journalCountry } = search  //req.query.search;


       const paginate = ({ page, pageSize }) => {
        const offset = page * pageSize;
        const limit = offset + pageSize

        return {
          offset,
          limit,
        }
       }


       await Journal.findAndCountAll({
           where: {
            [Op.or]:
              [ {title: {   [Op.substring]: title}},
              {coverageArea: {   [Op.substring]: coverageArea}},
              {journalCountry: {   [Op.substring]: journalCountry}},
              {issn: {   [Op.substring]: issn}},
             ]


            // [Op.or]:
            // [{title: searchQuery || ''},
            // {issn: searchQuery || ''},
            // {coverageArea: searchQuery}],
            // coverageArea: coverageArea || '',
            // journalCountry: journalCountry || '',
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
           throw new Error(err);
        //    res.send(throw new Error(err))

       })



}

