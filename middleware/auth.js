const jwt = require('jsonwebtoken');
require('dotenv').config();



//xac that nguoi dung
module.exports.authentication = (req,res,next) => {
    const token = req.header('Authorization');
    const KEY = process.env.SECRET_KEY;
    try {
        const decoded = jwt.verify(token,KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({error: "Token is invalid"})
    }
}

//phan quyen nguoi dung
module.exports.authorization = (userTypeArray) => {
    console.log('user type array: ', userTypeArray);
    return (req,res,next) => {
        const {userType} = req.user.payload;
        console.log('Current user:', userType);
        userType.map(userTypeDetails => {
             if(userTypeArray.indexOf(userTypeDetails)>-1) {
                 return next();
             } else {
                 return res.status(403).json({error: "No Permission"})
             }
        })
    }
}

