const joi = require("joi");
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

/* resgister schema : name, email, password */
const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

/* login Schema: email, password */
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})
/* generate token (umique identification(getId) for authentication) */

const generateToken = (getId) =>{
    return jwt.sign({getId}, "DEFAULT_SECRET_KEY",{
        expiresIn: 3*24*60*60,
    });
}
/* register user : use async function */
const registerUser = async (req, res, next) => {
    const {name, email, password} = await req.body;
    const {error} = registerSchema.validate({name, email, password});

    if(error){
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    try {
        const isUserAlreadyExists = await User.findOne({email});
        if (isUserAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "The user that you entered is already exists! please try with different user",
            });
        }else{
            const hashPassword = await bcrypt.hash(password, 12);

            /* creates name, email for the user with password which derived from hashpassword - bcrypt.hash(password, 12)  */
            const newlyCreatedUser = await User.create({
                name, email, password: hashPassword,
            });
            if (newlyCreatedUser) {
                const token = generateToken(newlyCreatedUser?._id);
                /* httpOnly:true gives you wall from accessing javascript, so give false for cross working of js inbetween */
                res.cookie("token", token, {
                    withCredentials: true,
                    httpOnly: false,
                });

                res.status(201).json({
                    success: true,
                    message: "user Registration successful",
                    userData: {
                        name: newlyCreatedUser.name,
                        email: newlyCreatedUser.email,
                        _id: newlyCreatedUser._id,
                    },
                });
                next();
            }
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!, please try again...",
        })
    }
}
/* login user */
const loginUser = async(req, res, next)=>{
    const {email, password} = await req.body;
    const {error} = loginSchema.validate({
        email, password,
    });
    if(error){
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    try {
      const getUser = await User.findOne({email});
      if (!getUser) {
        return res.status(400).json({
            success: false,
            message: "Incorrect email, enter correct email please",
        });
      }  
      const checkAuth = await bcrypt.compare(password, getUser.password);
      if(!checkAuth) return res.json({
        success: false,
        message: "Incorrect Password"
      });

      const token = generateToken(getUser?._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(201).json({
        success: true,
        message: "User Logged In",
      });
      next();

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: "something went wrong! please try again",
        })
    };

}
/* logout function */

const logOut = async (req, res) => {
    res.cookie("token", "", {
        withCredentials: true,
        httpOnly: false,
    });

    return res.status(200).json({
        success: true,
        message: "user logged out successfully",
    })
}

/* export the registerUser(validate, findOne, isUserAlreadyexists, newlycreatedUser(User.create), token it), loginUser(validate, getUser, checkAuth, token it), logOut */
module.exports = {registerUser, loginUser, logOut};