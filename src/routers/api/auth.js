import express from 'express';
import auth from '../../middleware/isAuth';
import User from '../../models/User';
const router = express.Router();

// @route  GET api/Auth
// @desc   Users route
// @access    Public
router.get('/', auth, async (req, res) => {

    // find a user by id
    try {
        const user = await User.findOne({
            where: {id: req.user.id},
            attributes: {exclude: ['password']}
         });
        console.log(req.user)
        res.json(user)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Internal Server Error')

    }
});


export default router;
