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
  database: "reconchain",
});

app.get("/", (req, res) => {
  console.log("Basic Api");
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password == confirmPassword) {
    const query =
      "INSERT INTO user_account (name, email, password) VALUES (?,?,?)";
    db.query(
      query,
      [username, email, password, confirmPassword],
      (err, result) => {
        console.log(err, result);
        res.send({ status: "Success" });
      }
    );
  } else {
    res.send({ status: "Failure" });
  }
});

app.post("/login", (req,res) => {
  const email = req.body.email;
  const password = req.body.password;

  const query = "SELECT * FROM user_account WHERE email = ? AND password = ?";

  db.query(
    query, [email, password],
    (err,result) => {
      if(err) {
        res.send({err:err})
      }
      if(result.length > 0){
        console.log(result);
        res.send({status: "Success"});
      }
      else{
        console.log("fail");
        res.send({status:"Failure"});
      }

    }
  )

});

app.listen(3001, () => {
  console.log("running express server");
});
