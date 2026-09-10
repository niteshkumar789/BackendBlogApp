const express = require('express');
require("dotenv").config();
const app = express();
app.use(express.json());
const PORTNUMBER = process.env.PORT || 3000;

const blog = require("./routes/blogRouter");
const { connectToDB } = require("./config/database");
connectToDB();

app.use("/api/v1", blog);

app.use("/", (req, res) => {
    res.send(`<h1> Hello </h1>`);
});

app.listen(PORTNUMBER, () => {
    console.log(`server started on port ${PORTNUMBER}`);
});