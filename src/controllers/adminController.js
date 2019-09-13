import express from 'express';
import { validationResult } from 'express-validator';
import { adminSignUpValidation, adminLoginValidation } from '../Validators/validation'
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';
require('dotenv').config();
import jwt from 'jsonwebtoken';

// @route  GET api/users
// @desc   Register Users
// @access    Public

// sign up a new user
export const adminSignUp = (


  async (req, res) => {
      adminSignUpValidation;
    const errors = validationResult(req);
    // throws errors is the request doesn't have the valid details
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(msg) })
    }
        const {username, email, password } = req.body
    try {
        // check if there is already a user with that request email and
        //throw error if it already exist
        let admin = await Admin.findOne({
            where: {email}
        });

        if(admin){
            res.status(400).json({errors: [{msg: 'Admin with this email already exist'}]})
        }
        // creates a new avatar or uses the one associated with the email provided

        // creates a new object of a user
        admin = new Admin({ username, email, password  })

        // Encrypte the password before saving to DB
        const salt = await bcrypt.genSalt(15);
        admin.password = await bcrypt.hash(password, salt);

        // Saves the new user
        await admin.save();
        const payload = {
            admin: admin.id,
            isAdmin: admin.isAdmin
        }
        jwt.sign(
            payload,
             process.env.SECRET_JWT,
            { expiresIn: 36000000 },
            (err, token)=> {
                if(err) throw err;
                res.status(201).json({ token },
                    );
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
export const adminLogin = async (req, res, next) => {



  adminLoginValidation
    const errors = validationResult(req);
    // throws errors is the request doesn't have the valid details
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
        const {email, password } = req.body
    try {
        // check if there is already a user with that request email and
        //throw error if it already exist
        let admin = await Admin.findOne({
           where: { email }
        });

        if(!admin){
            res.status(401).json({errors: [{msg: 'Invalid Login Details'}]})
        }

        // check if the password from the request is the same as the password from DB
        const isMatch = await bcrypt.compare(password, admin.password);

        // if passwords do not match throw an error
        if (!isMatch) {
          res.status(401).json({errors:[{msg: 'Invalid Login Details'}]})

        }
        const payload = {
            admin: admin.id,
        }
        jwt.sign(
            payload,
             process.env.SECRET_JWT,
            { expiresIn: 36000000 },
            (err, token)=> {
                if(err) throw err;
                res.json({ token, adminId: admin.id, email: admin.email })
            })

        // Return jsonwebtoken
        console.log(req.body);

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error');
    }



}