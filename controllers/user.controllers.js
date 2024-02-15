import ErrorHandler from "../middleware/error.middleware.js";
import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";

export const registerUser = async(req, res, next) => {
    try {
        const {name , email ,password} = req.body;

        const existedUser = await User.findOne({email}).maxTimeMS(1500000); 

        if (existedUser) {
          return next(new ErrorHandler("User already exist : ", 400));
        }


        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
          email,
          name,
          password: encryptedPassword,
        });

        sendCookie(user, res, "Registered SuccessFully", 201);


    } catch (error) {
        next(error);
    }
}


export const loginUser = async (req, res, next) => {
    //Get the data from the frontend 
    //Find the user from the db along with password
    // check if the user is exist or not
    //Compare the password 
    //check if the password is matched or not
    //Return the response

    try {
        const {email , password} = req.body;
        const user = await User.findOne({email}).select("+password");

        if(!user) 
        {
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }

       const isMatch =  await bcrypt.compare(password, user.password);

       if(!isMatch)
       {
        return next(new ErrorHandler("Invalid Email or Password", 400))
       }

       sendCookie(user, res, `Welcome Back ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}

export const logoutUser = async (req, res) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax": "none",
            secure : process.env.NODE_ENV === "Development" ? false : true
        })

        .json({
            success : true,
            user : req.user
        })
}

export const currentUser = async(req, res) => {
    res
        .status(200)
        .json({
            success: "true", 
            user : req.user
        })
}