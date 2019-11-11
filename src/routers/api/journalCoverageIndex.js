import express from 'express';
import isAuth from '../../middleware/isAuth';
import { addCoverageIndex, getAllCoverageIndex, editCoverageIndex, deleteCoverageIndex } from '../../controllers/journalCoverageIndexController';

const coverageIndexRouter = express.Router();


// @route  GET, POST, UPDATE, DELETE api/Journal Coverage Index
// @desc    route
// @access    Public

coverageIndexRouter.post('/new', addCoverageIndex);


coverageIndexRouter.get('/', getAllCoverageIndex);

coverageIndexRouter.put('/edit/:id', editCoverageIndex)



export default coverageIndexRouter

