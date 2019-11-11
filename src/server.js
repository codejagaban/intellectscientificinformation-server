require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './db';
import userRouter from './routers/api/users';
import journalsRouter from './routers/api/journals';
import profile from './routers/api/profile';
import adminRouter from './routers/api/admin';
import coverageIndexRouter from './routers/api/journalCoverageIndex';
import authRouter from './routers/api/auth';
import mailRouter from './routers/api/mail';
const app = express();


app.use(express.json( { extende: false}))
// define routes
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/journals', journalsRouter);
app.use('/api/coverage-index', coverageIndexRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profile);
app.use('/api/mails', mailRouter);

app.use(bodyParser.urlencoded({ extended: false}));



// associates the data in the DB

// User.hasMany(Journals);

const port = process.env.PORT || 5000 ;
app.listen( port, () => {
    console.log(`Server has  started at port  ${port}`);
})



