import express from 'express';

import CoverageArea from '../models/JournalCoverageArea';


export const addCoverageArea = async(req, res, next) => {
    // get the coverageArea
    const { coverageArea } = req.body;

    try {
        let journalCoverageArea = await CoverageArea.findOne({
            where: { coverageArea: coverageArea }
        });

        const newCoverageArea = new CoverageArea({ coverageArea });

        journalCoverageArea ? res.status(400).json({errors: [{msg: 'This coverage area already exists in the coverage area collection'}]}) :
        await newCoverageArea.save();

        res.status(201).json({
            msg: ' New Coverage Area  Added successfully'
        })
        console.log(req.body);

    }
    catch (err) {
        res.status(500).json({err});
        next()
    }

}



//Get all coverageAreas

export const getAllCoverageArea =  async (req, res, next) => {

    CoverageArea.findAll({})

    .then(response => {

        res.status(200).json({ coverageAreas:response})
        console.log(response)
    })
    .catch(err => {
        res.status(500).json({err})

        next();

        console.log(err)
    })

}