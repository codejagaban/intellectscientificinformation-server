import express from 'express';
import auth from '../../middleware/isAuth';
import User from '../../models/User';
const authRouter = express.Router();

// @route  GET api/Auth
// @desc  Checks if a user is authenticated
// @access    Public
authRouter.get('/', auth, async (req, res) => {

    console.log(req)

    // find a user by id
    try {
        const user = await User.findOne({
            where: {id: req.user},
            attributes: {exclude: ['password']}
         });
        console.log(req.user)
        res.json(user)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Internal Server Error')

    }
});


export default authRouter;
