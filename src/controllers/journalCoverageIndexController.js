import express from 'express';

import CoverageIndex from '../models/JournalCoverageIndex';


export const addCoverageIndex = async(req, res, next) => {
    // get the coverageIndex
    const { coverageIndex } = req.body;

    try {
        let journalCoverageIndex = await CoverageIndex.findOne({
            where: { coverageIndex: coverageIndex }
        });

        const newCoverageIndex = new CoverageIndex({ coverageIndex });

        journalCoverageIndex ? res.status(400).json({errors: [{msg: 'This coverage Index already exists in the coverage Index collection'}]}) :
        await newCoverageIndex.save();

        res.status(201).json({
            msg: ' New Coverage Index  Added successfully'
        });

    }
    catch (err) {
        res.status(500).json({err});
        next()
    }

}



//Get all coverageIndexs

export const getAllCoverageIndex =  async (req, res, next) => {

    CoverageIndex.findAndCountAll({})

    .then(response => {

        res.status(200).json({coverageIndexs: response.rows, count: response.count});
    })
    .catch(err => {
        res.status(500).json({err})

        next();

        console.log({err})
    })

}


export const editCoverageIndex = (req, res, next) => {
    const {newCoverageIndexDetails} = req.body;
    const {id} = req.params;
    CoverageIndex.update(
        { coverageIndex: newCoverageIndexDetails }, {
        where : {
            id : id
        }
    } )
    .then(edittedcoverageIndex =>  {
    res.status(200).json( { msg: 'Coverage Index editted successfully' } )
    })
    .catch(err => {
        res.status(500).json({ msg: err })
        console.log({ err })
        next()
    })
}


