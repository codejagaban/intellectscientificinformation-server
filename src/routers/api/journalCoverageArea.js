import express from 'express';
import isAuth from '../../middleware/isAuth';
import { addCoverageArea } from '../../controllers/journalCoverageAreaController';

const coverageAreaRouter = express.Router();


// @route  GET, POST api/Journal Coverage Area
// @desc    route
// @access    Public

coverageAreaRouter.post('/new', addCoverageArea);

export default coverageAreaRouter

