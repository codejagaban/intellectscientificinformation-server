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
        });

    }
    catch (err) {
        res.status(500).json({err});
        next()
    }

}



//Get all coverageAreas

export const getAllCoverageArea =  async (req, res, next) => {

    CoverageArea.findAndCountAll({})

    .then(response => {

        res.status(200).json({coverageAreas: response.rows, count: response.count});
    })
    .catch(err => {
        res.status(500).json({err})

        next();

        console.log({err})
    })

}


export const editCoverageArea = (req, res, next) => {
    const {newCoverageAreaDetails} = req.body;
    const {id} = req.params;
    CoverageArea.update(
        { coverageArea: newCoverageAreaDetails }, {
        where : {
            id : id
        }
    } )
    .then(edittedcoverageArea =>  {
    res.status(200).json( { msg: 'Journal editted successfully' } )
    })
    .catch(err => {
        res.status(500).json({ msg: err })
        console.log({ err })
        next()
    })
}


export const deleteCoverageArea = (req, res, next) => {
    const id  = req.params.id;
    console.log(id)
    CoverageArea.destroy({ where: {
        id: id
    } } )
    .then(destroyed => {
        res.status(200).json({ msg: 'Coverage Area deleted successfully' })
    })
    .catch(err => {
        res.status(500).json({ msg: err })
        next()
    })
}