import express from 'express';
import isAuth from '../../middleware/isAuth';
import { addNewJournal, getAllJournals, searchJournal, getJournalByID } from '../../controllers/journalController';

const journalsRouter = express.Router();

// @route  GET, POST api/Journal
// @desc   Add,delete,and update Journal route
// @access    Public/

journalsRouter.post('/new', addNewJournal);

journalsRouter.get('/master-list/:page/journals/:search', searchJournal);

journalsRouter.get('/all', getAllJournals);

journalsRouter.get('/:id', getJournalByID);


export default journalsRouter;
