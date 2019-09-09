import express from 'express';
import Journal from '../models/Journals';

import { validationResult } from 'express-validator';


export const addNewJournal = async(req, res, next) => {

    const  { title, publisher, worldOfScience, journalCitationResult, coverageArea } = req.body;

    const errors = validationResult(req)

    // throws an error if the details are not valid
    if(!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array(msg) })

    }


    try {
        let journal = await Journal.findOne({
            where: { title, publisher, worldOfScience, journalCitationResult, coverageArea}
        });

        if(journal){
            res.status(400).json({errors: [{msg: 'This journal already exists in our journal collection'}]})

        }

        const newJournal = new Journal({ title, publisher, worldOfScience, journalCitationResult, coverageArea })



        await newJournal.save();

        res.status(201).json({
            msg: 'Journal created successfully'
        })


    } catch (err) {
        res.status(500).json({err})

    }




}