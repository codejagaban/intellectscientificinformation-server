import express from 'express';
import { validationResult } from 'express-validator';
import { userSignUpValidation, userLoginValidation } from '../Validators/validation'
import User from '../models/User';
import bcrypt from 'bcryptjs';
require('dotenv').config();
import jwt from 'jsonwebtoken';

// @route  GET api/users
// @desc   Register Users
// @access    Public

// sign up a new user
export const userSignUp = (


  async (req, res) => {
      userSignUpValidation;
    const errors = validationResult(req);
    // throws errors is the request doesn't have the valid details
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(msg) })
    }
        const {firstName, lastName, jobTitle, email, password } = req.body
    try {
        // check if there is already a user with that request email and
        //throw error if it already exist
        let user = await User.findOne({
            where: {email}
        });

        if(user){
            res.status(400).json({errors: [{msg: 'User with this email already exist'}]})
        }
        // creates a new avatar or uses the one associated with the email provided

        // creates a new object of a user
        user = new User({ firstName, lastName, jobTitle, email, password  })

        // Encrypte the password before saving to DB
        const salt = await bcrypt.genSalt(15);
        user.password = await bcrypt.hash(password, salt);

        // Saves the new user
        await user.save();
        const payload = {
            user: user.id,
        }
        jwt.sign(
            payload,
             process.env.SECRET_JWT,
            { expiresIn: 36000000 },
            (err, token)=> {
                if(err) throw err;
                res.status(201).json({ token });
            })

        // res.send()
        // Return jsonwebtoken
        console.log(req.body);

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error');
    }
});


// Login A User
export const userLogin = async (req, res, next) => {



  userLoginValidation
    const errors = validationResult(req);
    // throws errors is the request doesn't have the valid details
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
        const {email, password } = req.body
    try {
        // check if there is already a user with that request email and
        //throw error if it already exist
        let user = await User.findOne({
           where: { email }
        });

        if(!user){
            res.status(401).json({errors: [{msg: 'Invalid Login Details'}]})
        }

        // check if the password from the request is the same as the password from DB
        const isMatch = await bcrypt.compare(password, user.password);

        // if passwords do not match throw an error
        if (!isMatch) {
          res.status(401).json({errors:[{msg: 'Invalid Login Details'}]})

        }
        const payload = {
            user: user.id,
        }
        jwt.sign(
            payload,
             process.env.SECRET_JWT,
            { expiresIn: 36000000 },
            (err, token)=> {
                if(err) throw err;
                res.json({ token, userId: user.id, email: user.email })
            })

        // Return jsonwebtoken
        console.log(req.body);

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error');
    }



}