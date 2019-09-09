import express from 'express';
import isAuth from '../../middleware/isAuth';
import { addNewJournal } from '../../controllers/journalController';

const journalsRouter = express.Router();

// @route  GET api/Journal
// @desc   Test route
// @access    Public
journalsRouter.post('/new', addNewJournal);


export default journalsRouter;
