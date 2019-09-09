import express from 'express';
import { adminSignUpValidation, adminLoginValidation } from '../../Validators/validation';
import { adminSignUp, adminLogin } from '../../controllers/adminController';

const adminRouter = express.Router();

// @route  GET api/Admin
// @desc   admin route, login, register,
// @access    Public
adminRouter.post('/signup', adminSignUpValidation, adminSignUp);

adminRouter.post('/login', adminLoginValidation, adminLogin);

export default adminRouter;
