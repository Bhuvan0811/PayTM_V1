const jwt = require('jsonwebtoken');
const { User } = require('./modal/db');
const JWT_SECRET = process.env.JWT_SECRET;
const userMiddleware = async (req,res,next) =>{
    if(!req.headers.authorization) return res.status(404).json({ msg: "Authorization header is missing" })
    const authHeader = req.headers.authorization.split(' ');
    const bearer = authHeader[0];
    const token = authHeader[1];

    if(bearer !== "Bearer" || authHeader.length !== 2) return res.status(403).json({ msg: "Wrong format of authorization header." });

    try{
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const dbUser = await User.findOne({ _id: decodedToken.userId });

        if(!dbUser) return res.status(401).json({ msg: "Wrong token" }) 
        req.userId = dbUser._id
        next();
    }
    catch(err){
        return res.status(400).json({ msg: "Invalid Token" })
    }
}
module.exports = { userMiddleware }