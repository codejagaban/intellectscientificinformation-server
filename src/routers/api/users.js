import express from 'express';
const userRouter = express.Router();
import { userSignUp, userLogin, getUsers, getMonthlyUsers, mostRecentUsers} from '../../controllers/userController';
import { userSignUpValidation, userLoginValidation } from '../../Validators/validation';
import isAuth, { isAdmin } from '../../middleware/isAuth';

// @route   GET,POST api/users,
// @desc   Register, Login Users,
// @access    Public

userRouter.get('/', getUsers);

userRouter.get('/monthly',getMonthlyUsers);

userRouter.get('/most-recent',mostRecentUsers);

userRouter.post('/signup',userSignUpValidation, userSignUp);


userRouter.post('/login',userLoginValidation , userLogin );

export default userRouter;
