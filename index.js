const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("../ChatAppSocket/routes/userRoutes");
const UserModel = require("../ChatAppSocket/model/userModel");

dotenv.config();

mongoose.connect(process.env.MONGOURL).then(() => console.log("Database Connected")).catch((error) => {
    console.log(error);
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);

app.listen(process.env.PORT, () => {
    console.log("Local Server Connected " + process.env.PORT);
});
