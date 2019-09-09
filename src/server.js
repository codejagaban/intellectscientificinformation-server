require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './db';
import userRouter from './routers/api/users';
import auth from './routers/api/auth';
import journals from './routers/api/journals';
import profile from './routers/api/profile';

const app = express();

// connect to the DB


app.use(express.json( { extende: false}))
// define routes
app.use('/api/users', userRouter);
app.use('/api/auth', auth);
app.use('/api/journals', journals);
app.use('/api/profile', profile);

app.use(bodyParser.urlencoded({ extended: false}));


const port = process.env.PORT || 5000 ;
app.listen( port, () => {
    console.log(`Server has  started at port  ${port}`);
})


