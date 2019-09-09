import express from 'express';
import Journal from '../models/Journals';

import { validationResult } from 'express-validator';


export const addNewJournal = async(req, res, next) => {

    const  { title, publisher, issn, e_issn, journalPrimaryLang, journalSecondaryLang, journalHomePageUrl, worldOfScience, journalCitationResult, coverageArea, journalCountry, journalFrequency, journalFirstYear, journalReviewLastYear,
    journalRecentIssue, journalPeerPolicy, editorialName, editorialPhone, editorialEmail, editorialJobTitle, publisherCountry, publisherAddress, publicationModel, publicationOwner, journalConjunction } = req.body;


    try {
        let journal = await Journal.findOne({
            where: { title, publisher }
        });

        const newJournal = new Journal({ title, publisher, issn, e_issn, journalPrimaryLang, journalSecondaryLang, journalHomePageUrl, worldOfScience, journalCitationResult, coverageArea, journalCountry, journalFrequency, journalFirstYear, journalReviewLastYear,
            journalRecentIssue, journalPeerPolicy, editorialName, editorialPhone, editorialEmail, editorialJobTitle, publisherCountry, publisherAddress, publicationModel, publicationOwner, journalConjunction })



        journal ?  res.status(400).json({errors: [{msg: 'This journal already exists in our journal collection'}]}) :


            await newJournal.save();

            res.status(201).json({
                msg: ' New Journal created successfully'
            })
            console.log(req.body);



    } catch (err) {
        res.status(500).json({err})

    }




}