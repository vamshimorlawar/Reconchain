const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reconchain"
});

app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO user_account (name, email, password, confirmPassword) VALUES ('Deepak', 'deepak09@gmail.com', '12345678', '12345678')";
    db.query(sqlInsert, (err, result) => {
        res.send("Sql insert query fired")
    })
});



app.listen(3001, ()=>{
    console.log("running express server");
});
