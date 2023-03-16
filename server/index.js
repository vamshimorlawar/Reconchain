const express = require("express");
const mysql = require("mysql");
// const cors = require("cors");

const app = express();

app.use(express.json());
// app.use(cors());

const db = mysql.createConnection({
    user: "localhost",
    host: "localhost",
    password: "",
    database: ""
});

app.listen(3001, ()=>{
    console.log("running express server");
});
