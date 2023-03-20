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
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password == confirmPassword)
    {
        res.send({status: "Success"})
    }
    else{
        res.send({status: "Failure"})
    }
})



app.listen(3001, ()=>{
    console.log("running express server");
});
