const User = require("./model");

exports.signUp = async (req, res) => {
    try {
    const newUser = await User.create(req.body); //req.body is an object that contains k/v pairs that match my User model
    res.send({ user: newUser });
    } catch (error) {
    console.log(error);
    res.send({ error });
}
};

exports.login = async (req, res) => {
    try {
    const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
    });
    if (!user) {
    throw new Error("Incorrect credentials");
    } else {
    res.send({ user });
    }
} catch (error) {
    console.log(error);
    res.send({ error });
}
};

exports.findAll = async (req, res) => {
    try {
    const user = await User.find(req.body); //req.body is an object that contains k/v pairs that match my User model
    res.send({ user });
    } catch (error) {
    console.log(error);
    res.send({ error });
}
};

exports.deleteOne = async (req, res) => {
    try {
    const users = await User.deleteOne(req.params.username);
    console.log(req.params.username);
    res.send({ user: deleteOne });
    } catch (error) {
    console.log(error);
    res.send({ error });
    }
};