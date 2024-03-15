const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    try {

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const userData = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            image: "/images" + req.file.filename
        });

        await userData.save();

        return res.status(200).json({ status: true, message: "Registration Successfully" });


    } catch (error) {

        res.status(500).json({ status: false, message: error })
        console.log(error);

    };
};



const login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(500).json({ status: false, message: "User not found" });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.status(500).json({ status: false, message: "Password is incorrect" });
        }

        const userToken = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.SECRET, { expiresIn: "30d" });
        

        return res.status(200).json({
            status: true,
            message: "Login Successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                is_online: user.is_online
            },
            token: userToken


        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "An error occurred while logging in" });
    }
};

const getuser = async (req, res) => {

    const userdata = await UserModel.find({});

    res.status(200).json({ status: true, data: userdata });


};

const getUserData = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};






module.exports = {

    register,
    login,
    getuser,
    getUserData,

};
