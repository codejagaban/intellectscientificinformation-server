require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './db';
import userRouter from './routers/api/users';
import auth from './routers/api/auth';
import journalsRouter from './routers/api/journals';
import profile from './routers/api/profile';
import adminRouter from './routers/api/admin';
import Journals from './models/Journals';
import User from './models/User';
import coverageAreaRouter from './routers/api/journalCoverageArea';
import authRouter from './routers/api/auth';
import CoverageArea from './models/JournalCoverageArea';

const app = express();

// connect to the DB


app.use(express.json( { extende: false}))
// define routes
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/journals', journalsRouter);
app.use('/api/coverage-area', coverageAreaRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profile);

app.use(bodyParser.urlencoded({ extended: false}));



// associates the data in the DB

User.hasMany(Journals);

const port = process.env.PORT || 5000 ;
app.listen( port, () => {
    console.log(`Server has  started at port  ${port}`);
})



