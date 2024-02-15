import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';


export const isAuthenticated = async (req, res ,next) => {
    const {token} = req.cookies;

    if(!token) 
    {
        return res
            .status(400)
            .json({
                success : false,
                message : "Login first"
            });
    }
    const deCoded = jwt.verify(token , process.env.JWT_SECRET);
    req.user = await User.findById(deCoded._id);
    next();
}