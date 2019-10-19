import express from 'express';
import isAuth from '../../middleware/isAuth';
import { addNewJournal, getAllJournalsCount, searchJournal, getJournalByID, getMonthlyJournal, pendingJournals, mostRecentJournals, getYearlyJournals, getAllJournals } from '../../controllers/journalController';

const journalsRouter = express.Router();

// @route  GET, POST api/Journal
// @desc   Add,delete,and update Journal route
// @access    Private/Public


journalsRouter.post('/all/:page', getAllJournals);

journalsRouter.post('/new', addNewJournal);

journalsRouter.post('/master-list/:page/journals/:search', searchJournal);

journalsRouter.get('/all-count', getAllJournalsCount);


journalsRouter.get('/monthly', getMonthlyJournal);

journalsRouter.get('/yearly-stat', getYearlyJournals);

journalsRouter.get('/most-recent', mostRecentJournals);

journalsRouter.get('/pending', pendingJournals);

journalsRouter.get('/:id', getJournalByID);


export default journalsRouter;
