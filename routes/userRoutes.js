const router = require("express").Router();
const userController = require("../controller/userController");
const verifyToken = require("../middleware/auth_middleware");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images"));
    },

    filename: (req, file, cb) => {
        const name = Date.now() + '_' + file.originalname;
        cb(null, name);
    },

});

const upload = multer({storage : storage});

router.post("/register",upload.single("image"),userController.register);
router.post("/login",userController.login);
router.get("/users",verifyToken,userController.getuser);
router.get("/single-user",verifyToken,userController.getUserData);

module.exports = router;
