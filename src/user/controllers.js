const jwt = require("jsonwebtoken");
const User = require("./model");

exports.signUp = async (req, res) => {
    try {
      const newUser = await User.create(req.body); //req.body is an object that contains k/v pairs that match my User model
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET); //sign method creates a token with object payload hidden in it
    res.send({ user: newUser, token });
    } catch (error) {
    console.log(error);
    res.send({ error });
    }
};

//params t.client get user/(username)
exports.login = async (req, res) => {
    try {
      // const user = await User.findOne({username: req.body.username, password: req.body.password});
    console.log("in login " + req.user);
    if (!req.user) {
        throw new Error("Incorrect credentials");
    } else {
        console.log("Login in successful")
        res.send({ user: req.user });
    }
    } catch (error) {
    console.log(error);
    res.send({ error });
    }
};

exports.listUser = async (req, res) => {
    try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
        throw new Error("No user found");
    } else {
        res.send({ user });
    }
    } catch (error) {
    console.log(error);
    res.send({ error });
    }
};

exports.deleteOne = async (req, res) => {
    try {
    const user = await User.findOneAndDelete({ username:req.params.username });
    res.send({user});
    } catch (error) {
    console.log(error);
    res.send({ error });
    }
};
// exports.deleteOne = async (req, res) => {
//     try {
//     const user = await User.findOneAndDelete({ password:req.params.password });
//     res.send({user});
//     } catch (error) {
//     console.log(error);
//     res.send({ error });
//     }
// };

exports.findAll = async (req, res) => {
    try {
    const users = await User.find(req.body);
    if (!users) {
        throw new Error("User not found");
    } else {
        res.send({ users });
    }
    } catch (error) {
    console.log(error);
    res.send({ error });
    }
};


//similar to user login
// exports.updateUser = async (req, res) => {
//     try {
//     const result = await User.updateOne(
//         req.body.filterObj,
//         req.body.updateObj
//     );
//     if (result.modifiedCount > 0) {
//         res.status(200).send({ msg: "Successfully Updated" });
//     } else {
//         throw new Error({ msg: "Something went wrong" });
//     }
//     } catch (error) {
//     console.log(error);
//     res.send({ error });
//     }
// };

exports.updateEmail = async (req, res) => {
    try {
    if (!req.user) {
        throw new Error("Incorrect credentials");
    } else {
        const user = await User.findOneAndUpdate({ username: req.body.username },{ email: req.body.newEmail});//need to have new email address under current one need password to change
			res.send({ user });
		}
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};