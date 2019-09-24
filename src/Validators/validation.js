
import { check,  } from 'express-validator';

// @validations  validation arrays
// @desc   validates any request before they are sent
// @access    Public


export const userSignUpValidation =

[
    // validators for throwing errors
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('jobTitle', 'Job Title  is required').not().isEmpty(),
    check('email', 'Email address is invalid').isEmail(),
    check('password', 'Please enter a password of 6 or more characters').isLength({min: 6})

];



export const userLoginValidation = [
    // validators for throwing errors
    check('email', 'Email address is invalid').isEmail(),
    check('password', 'Password is required').exists()

];


export const adminSignUpValidation =

[
    // validators for throwing errors
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email address is invalid').isEmail(),
    check('password', 'Please enter a password of 6 or more characters').isLength({min: 6})

];



export const adminLoginValidation = [
    // validators for throwing errors
    check('email', 'Email address is invalid').isEmail(),
    check('password', 'Password is required').exists()

];


