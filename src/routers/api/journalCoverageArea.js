import express from 'express';
import isAuth from '../../middleware/isAuth';
import { addCoverageArea, getAllCoverageArea, editCoverageArea, deleteCoverageArea } from '../../controllers/journalCoverageAreaController';

const coverageAreaRouter = express.Router();


// @route  GET, POST, UPDATE, DELETE api/Journal Coverage Area
// @desc    route
// @access    Public

coverageAreaRouter.post('/new', addCoverageArea);


coverageAreaRouter.get('/', getAllCoverageArea);

coverageAreaRouter.put('/edit/:id', editCoverageArea)

coverageAreaRouter.delete('/delete/:id', deleteCoverageArea)



export default coverageAreaRouter

