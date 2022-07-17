const { Router } = require("express"); //import Router method only from express
const { signUp, login, deleteOne, listUser, findAll, updateEmail } = require("./controllers"); //import only signUp from controllers file
const { hashPass, comparePass,tokenCheck } = require("../middleware");
const userRouter = Router(); //create a router that can have endpoints added to it

userRouter.post("/user", hashPass, signUp); //defining a post request on /user path, that calls the signUp controller
userRouter.post("/login", comparePass, login); //defining a post request on /login path, that calls the login controller
userRouter.get("/token", tokenCheck, login);
userRouter.get("/user/:username", listUser);//params added
userRouter.delete("/user/:username", comparePass,deleteOne);
userRouter.get("/user", findAll);
userRouter.put("/user/:username", comparePass, updateEmail);


module.exports = userRouter;