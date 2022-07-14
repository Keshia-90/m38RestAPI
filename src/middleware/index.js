const bcrypt  = require("bcryptjs");
const jwt = require ("jsonwebtoken");
const User =require("../user/model");

exports.hashPass = async (req, res, next) => {
    try {
      // const tempPass = req.body.password; //grabbed password variable from body, and stored it locally
      // const hashedPass = await bcrypt.hash(tempPass, 8); //hashed the password and stored it in a new constant
      // req.body.password = hashedPass; //stores freshly hashed password back in the req body
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8); //all steps above, condensed into 1 line
    }else if (req.body.updateObj.password) {
        req.body.updateObj.password = await bcrypt.hash(req.body.password, 8);
    }
      next(); //moves onto next middleware/controller in endpoint
    } catch (error) {
    console.log(error);
    res.send({ error });
    }
};

exports.comparePass = async (req, res, next) => {
    try {
        req.user = await User.findOne({username: req.body.username});
        // const match = await bcrypt.compare(req.body.password, req.user.password);
        if (await bcrypt.compare(req.body.password, req.user.password)) {
            next();
        } else {
            throw new Error("Incorrect Credentials");
        }
    } catch (error) {
        console.log(error);
        res.send({error});
    }
};

exports.tokenCheck = async (req, res, next) => {
    try {
        // const token = req.header("Authorization")
        // console.log(token);//logs token
        const decodedToken = jwt.verify(req.header("Authorization"), process.env.SECRET);
        // console.log(decodedToken);
        req.user = await User.findById(decodedToken.id);
        // console.log(user);
        // req.user = user
        // console.log(req.user)
        next();
    } catch (error) {
    console.log(error);
    res.send({ error });
    }
};