const jwt = require("jsonwebtoken");
const user = require("../models/user")

const userAuthVerification = async (req, res) => {
    const token = req.cookies.token; // retrive token from cookies
    console.log(token, "token");

    if (!token) {
        return res.json({
            success: false,
            message: "Token is not available or Invalid Token",
        });
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "DEFAULT_SECRET_KEY");

            console.log(decoded, "decoded");

            const userInfo = await user.findById(decoded.getId);
            console.log(userInfo, "userInfo");
            req.user = userInfo;
                return res.status(200).json({
                    success: true,
                    userInfo,
                });
                
        } catch (error) {
            console.error("Token verification failed:", error);

        // Handle token expiration or invalid token
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please log in again.",
            });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again.",
            });
        }

        // Handle other unexpected errors
        return res.status(500).json({
            success: false,
            message: "An error occurred while verifying the token.",
        });
    }
}

};
module.exports = {userAuthVerification};