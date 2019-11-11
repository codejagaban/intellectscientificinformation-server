import express from 'express';
import isAuth from '../../middleware/isAuth';
import { addNewJournal, getAllJournalsCount, searchJournal, getJournalByID, getMonthlyJournal, pendingJournals, mostRecentJournals, getYearlyJournals, getAllJournals, editJournal, deleteJournal, getJournalById } from '../../controllers/journalController';

const journalsRouter = express.Router();

// @route  GET, POST api/Journal
// @desc   Add,delete,and update Journal route
// @access    Private/Public


journalsRouter.get('/all', getAllJournals);

journalsRouter.post('/new', addNewJournal);

journalsRouter.post('/', searchJournal);
journalsRouter.get('/pending', pendingJournals);


journalsRouter.get('/all-count', getAllJournalsCount);

journalsRouter.get('/monthly', getMonthlyJournal);

journalsRouter.get('/yearly-stat', getYearlyJournals);

journalsRouter.get('/most-recent', mostRecentJournals);
journalsRouter.get('/:id', getJournalById)


journalsRouter.patch('/edit/:id', editJournal)

journalsRouter.delete('/delete/:id', deleteJournal)



export default journalsRouter;
