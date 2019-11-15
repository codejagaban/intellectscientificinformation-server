import express from 'express';
import { validationResult } from 'express-validator';
import { userSignUpValidation, userLoginValidation } from '../Validators/validation'
import User from '../models/User';
import bcrypt from 'bcryptjs';
require('dotenv').config();
import jwt from 'jsonwebtoken';
import moment from 'moment';

import Sequelize from 'sequelize';


// @route  GET api/users
// @desc   Register Users
// @access    Public



const Op = Sequelize.Op; //DB Operator
// sign up a new user
export const userSignUp = (


  async (req, res) => {
      userSignUpValidation;
    const errors = validationResult(req);
    // throws errors is the request doesn't have the valid details
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
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

    } catch (err) {
        console.log({err})
        res.status(500).send('Server Error');
    }
});


// Login A User
export const userLogin = async (req, res) => {



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
        } else {

        // check if the password from the request is the same as the password from DB
        const isMatch = await bcrypt.compare(password, user.password);

        // if passwords do not match throw an error
        if (!isMatch) {
          res.status(401).json({errors:[{msg: 'Invalid Login Details'}]})

        } else {
            const payload = {
                user: user.id,
                isAdmin: user.isAdmin
            }
            jwt.sign(
                payload,
                 process.env.SECRET_JWT,
                { expiresIn: 36000000 },
                (err, token)=> {
                    if(err) throw err;
                    res.json({ token, isAdmin: user.isAdmin })
                })


        }

        }



    } catch (err) {
        console.log({err})
        res.status(500).send('Server Error');
    }

}

// get all users
export const getUsers = (req, res, ) => {

     User.findAndCountAll({
         where: {
             isAdmin: false,
         },
         attributes: {
             exclude: ["password"]
         }
     })
    .then(users => {


        if(!users) {
            res.status(404).json({msg: 'No user found'})
        }
        // let recentUsers = null;
        // user.map( user => {
        //     let day =  new Date();
        //     if(user.createAt <=  day.setDate(-5)) {
        //         console.log(user)
        //         return user
        //     }
        //     else {
        //         console.log('they are all old users')
        //     }
        // } )
        res.status(200).json({ allUsers: users.rows, count: users.count });
    })
    .catch(err => {
        console.log({ err })

        res.status(500).json({ msg: err })
    })

}


export const getMonthlyUsers = (req, res, next) => {


    // get all the new users for this month
    const now = new Date();

    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear()

    User.findAndCountAll({
        where: {
           [Op.and] :
           [ {createdAt : {[Op.substring] : `${thisYear}-${thisMonth + 1}`}},
           { isAdmin: false }
        ]

        }
    })
    .then(monthlyUsers => {
        res.status(200).json({ totalMonthlyUsersCount: monthlyUsers.count })
    })

    .catch(err => {
        console.log({err})
        res.status(500).json({ msg: err })
    })

}




// get most recent  5 journals submitted
export const mostRecentUsers = (req, res) => {
    const now = moment().format()

    const lastFive = moment().subtract(5, 'days');
    User.findAndCountAll({
        where: {
                createdAt: {
                    [Op.between] : [ lastFive, now ]
                }
            },
        attributes: { exclude: ["password"] }
    })

    .then(mostRecent => {
        res.status(200).json({ mostRecentUsers: mostRecent.rows, mostRecentUsersCount: mostRecent.count })
    })

    .catch(err => {
        console.log({err})
        res.status(500).json({ msg: err })
    })
}
