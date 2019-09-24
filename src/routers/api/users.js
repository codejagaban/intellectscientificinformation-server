import express from 'express';
const userRouter = express.Router();
import { userSignUp, userLogin, getUsers} from '../../controllers/userController';
import { userSignUpValidation, userLoginValidation } from '../../Validators/validation';
import isAuth from '../../middleware/isAuth';

// @route   GET,POST api/users,
// @desc   Register, Login Users,
// @access    Public

userRouter.get('/', isAuth, getUsers);


userRouter.post('/signup',userSignUpValidation, userSignUp);


userRouter.post('/login',userLoginValidation , userLogin );


export default userRouter;
