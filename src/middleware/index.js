const bcrypt  = require("bcryptjs");

exports.hashPass = async (req, res, next) => {
    try {
        // const tempPass = req.body.password;//grabbed p.word variable from body and stored it locaolly
        // const hashedPass = await bcrypt.hash(tempPass, 8);//hashed p.word and stored it in a new constant
        // req.body.password = hashedPass;//stores freshly hashed password back in req body
        req.body.password = await bcrypt.hash(req.body.password, 8); //lines 5,6,7 condensed into one line
        next();//moves onto next middleware/controller in endpoint
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

