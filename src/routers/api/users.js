import express from 'express';
const userRouter = express.Router();
import { userSignUp, userLogin} from '../../controllers/userController';
import { userSignUpValidation, userLoginValidation } from '../../Validators/validation';
import isAuth from '../../middleware/isAuth';

// @route  GET api/users
// @desc   Register, Login Users
// @access    Public
userRouter.post('/signup',userSignUpValidation, userSignUp);


userRouter.post('/login',userLoginValidation , userLogin );

// router.get('/get-user', isAuth)

export default userRouter;
