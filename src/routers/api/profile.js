import express from 'express';

const router = express.Router();

// @route  GET api/PRofile
// @desc   Test route
// @access    Public
router.get('/', (req, res) => res.send(' PRofile route'));



export default router;
