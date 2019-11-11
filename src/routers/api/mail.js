import express from 'express';
import { sendContactMail } from '../../controllers/mailController';

const mailRouter = express.Router();

mailRouter.post('/contact',sendContactMail);



export default mailRouter;