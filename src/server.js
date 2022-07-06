require("./db/connection"); //inst runs database connection
const express = require("express"); //pull in all of express modulr
const userRouter = require("./user/routes");
const app = express();//create web server constant to manipulate
const port = process.env.PORT || 5001; // store either supplied port or 5001

app.use(express.json());

app.use(userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//listening on localhost:5001 for requests to our webserver