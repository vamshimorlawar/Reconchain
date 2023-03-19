const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
// res.header( "Access-Control-Allow-Origin" );

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reconchain"
});

app.get('/', (req, res) => {
    console.log("Basic Api");
});

app.post('/signup', (req, res) => {
    const username = req.body.username;
    console.log("signup api hit", username);
    res.send({msg: "Success"});
})



app.listen(3001, ()=>{
    console.log("running express server");
});
