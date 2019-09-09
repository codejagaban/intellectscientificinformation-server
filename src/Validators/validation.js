
import { check,  } from 'express-validator';

// @validations  validation arrays
// @desc   validates any request before they are sent
// @access    Public


export const userSignUpValidation =

[
    // validators for throwing errors
    check('name', 'Full Name is required').not().isEmpty(),
    check('email', 'Email address is invalid').isEmail(),
    check('password', 'Please enter a password of 6 or more characters').isLength({min: 6})

];



export const userLoginValidation = [
    // validators for throwing errors
    check('email', 'Email address is invalid').isEmail(),
    check('password', 'Password is required').exists()

];



export const journalValidation = [
    // check if the person is sending empty journals
    check('title', 'Journal title is required').exists(),
    check('publisher', 'Journal publisher is required').exists(),
    check('worldOfScience', ' world Of Science is required').exists(),
    check('journalCitationResult', 'Journal journalCitationResult is required').exists(),
    check('coverageArea', 'Journal coverage Area is required').exists()

]

