import express from 'express';

const adminRouter = express.Router();

// @route  GET api/Admin
// @desc   admin route, login, register,
// @access    Public
adminRouter.get('/', (req, res) => res.send('Admin route'));
``

export default adminRouter;
