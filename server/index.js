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
  const userType = req.body.userType;

  if (password == confirmPassword) {
    const query =
      "INSERT INTO user_account (name, email, password, userType) VALUES (?,?,?,?)";
    const query_2 =
      "INSERT INTO candidate_profile (username	,email	,rating,	interests	,education	,experience,	skills,	languages,	mobile) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(query, [username, email, password, userType], (err, result) => {
      if (err) {
        res.send({
          status: "failure",
        });
      } else {
        res.send({ status: "success" });
      }
    });
    if(userType === "candidate")
    {
    db.query(
      query_2,
      [username, email, 0, "", "", "", "", "", ""],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );}
    else{
      console.log("query2 failed");
    }
  } else {
    res.send({
      status: "password didnt match",
    });
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const query = "SELECT * FROM user_account WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      res.send({ status: "failure" });
    }
    if (result.length > 0) {
      if (result[0].userType == "candidate") {
        location = "/candidate-home";
      }
      if (result[0].userType == "company") {
        location = "/company-home";
      }
      console.log(location);
      res.send({ status: "success", location: location });
    } else {
      res.send({ status: "no data found" });
    }
  });
});

app.post("/getCandidateProfile",(req,res) => {
  const email = req.body.email;
  const query = "SELECT * FROM candidate_profile WHERE email = ?";

  db.query(query,[email],(err,result) => {
    if(err){
      res.send({status: "failure"})
    }
    if(result.length > 0){
      res.send({
        status: "success",
        username: result[0].username,
        email: result[0].email,
        rating: result[0].rating,
        interests: result[0].interests,
        education: result[0].education,
        experience: result[0].experience,
        skills: result[0].skills,
        languages: result[0].languages,
        mobile: result[0].mobile
      })
    }
  })

})

app.listen(3001, () => {
  console.log("running express server");
});
