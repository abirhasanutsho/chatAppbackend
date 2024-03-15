const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Invalid or missing token in the Authorization header" });
        }
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ success: false, message: "Invalid token" });
            }
            req.user = { userId: decodedToken.id };
            next(); 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server error" });
    }
};

module.exports = verifyToken;
