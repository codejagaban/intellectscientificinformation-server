import jwt from 'jsonwebtoken';

require('dotenv').config();



const isAuth = (req, res, next) => {
      // get token from header
const token = req.header('Authorization');



    // check if there is no token
    if(!token) {
        return res.status(401).json({ msg: 'No token found, Authorization denied'})
    }

    // verify the token if there is one
    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);

        req.user = decoded.user;
        next()

    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'})

    }


}
export const isAdmin = (req, res, next) => {
      // get token from header
const token = req.header('Authorization');


    //check if the user is am admin

    try{
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.isAdmin = decoded.isAdmin;

        next();
    }
    catch(err) {
        res.status(403).json({msg: 'You do not have permission to view this route'})
    }



}

export default isAuth;