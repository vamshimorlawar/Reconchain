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
      "INSERT INTO candidate_profile (username, email, rating,	interests	,education	,experience,	skills,	languages,	mobile) VALUES (?,?,?,?,?,?,?,?,?)";

    const query_3 =
      "INSERT INTO company_profile (username, email, rating, company_name, location, mobile, website, about, number_job_posts) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(query, [username, email, password, userType], (err, result) => {
      if (err) {
        res.send({
          status: "failure",
        });
      } else {
        res.send({ status: "success" });
      }
    });
    if (userType === "candidate") {
      db.query(
        query_2,
        [username, email, 0, "", "", "", "", "", ""],
        (err, result) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    if (userType === "company") {
      db.query(
        query_3,
        [username, email, 0, "", "", "", "", "", 0],
        (err, result) => {
          if (err) {
            console.log(err);
          }
        }
      );
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
      res.send({ status: "success", location: location });
    } else {
      res.send({ status: "no data found" });
    }
  });
});

app.post("/getCandidateProfile", (req, res) => {
  const email = req.body.email;
  const query = "SELECT * FROM candidate_profile WHERE email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      res.send({ status: "failure" });
    }
    if (result.length > 0) {
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
        mobile: result[0].mobile,
      });
    }
  });
});

app.post("/updateCandidateProfile", (req, res) => {
  const email = req.body.email;
  const interests = req.body.interests;
  const education = req.body.education;
  const experience = req.body.experience;
  const skills = req.body.skills;
  const languages = req.body.languages;
  const mobile = req.body.mobile;

  const query =
    "UPDATE candidate_profile SET interests = ?, education = ?, experience = ?, skills = ?, languages = ?, mobile = ? WHERE email = ?";

  db.query(
    query,
    [interests, education, experience, skills, languages, mobile, email],
    (err, result) => {
      if (err) {
        res.send({ status: "failure" });
      } else {
        res.send({ status: "success" });
      }
    }
  );
});

app.post("/getCompanyProfile", (req, res) => {
  const email = req.body.email;
  const query = "SELECT * FROM company_profile WHERE email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      res.send({ status: "failure" });
    }
    if (result.length > 0) {
      res.send({
        status: "success",
        username: result[0].username,
        email: result[0].email,
        rating: result[0].rating,
        company_name: result[0].company_name,
        location: result[0].location,
        mobile: result[0].mobile,
        website: result[0].website,
        about: result[0].about,
        number_job_posts: result[0].number_job_posts,
      });
    }
  });
});

app.post("/updateCompanyProfile", (req, res) => {
  const email = req.body.email;
  const company_name = req.body.company_name;
  const location = req.body.location;
  const mobile = req.body.mobile;
  const website = req.body.website;
  const about = req.body.about;

  const query =
    "UPDATE company_profile SET company_name = ?, location = ?, mobile = ?, website = ?, about = ? WHERE email = ?";

  db.query(
    query,
    [company_name, location, mobile, website, about, email],
    (err, result) => {
      if (err) {
        res.send({ status: "failure" });
      } else {
        res.send({ status: "success" });
      }
    }
  );
});

app.post("/createApplicationProfile", (req,res) => {
  const candidate_email = req.body.candidate_email;
  const company_email = req.body.company_email;
  const job_id = req.body.job_id;

  const query = "INSERT INTO application (candidate_email, company_email, job_id) VALUES (?, ?, ?)";

  db.query( 
    query,
    [candidate_email,company_email,job_id],
    (err,result) => {
      if (err) {
        console.log(err);
        res.send({ status: "failure" });
      } else {
        
        res.send({ status: "success" });
      }
    }
  );
});

app.post("/addJobPost", (req, res) => {
  const company_email = req.body.company_email;
  const title = req.body.title;
  const description = req.body.description;
  const tag = req.body.tag;
  const location = req.body.location;
  const type = req.body.type;
  const salary = req.body.salary;

  const query =
    "INSERT INTO job_posts (company_email, title, description, tag, location, type, salary, report) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [company_email, title, description, tag, location, type, salary, 0],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: "failure" });
      } else {
        
        res.send({ status: "success" });
      }
    }
  );
});

app.post("/getJobPosts", (req, res) => {
  const email = req.body.email;
  const query = "SELECT * FROM job_posts WHERE company_email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: "failure" });
    } else {
      res.send({ status: "success", posts: result });
    }
  });
});

app.post("/getAppliedJobs",(req,res) => {

  let jobList = [];
  let completedQueries = 0;
  const email = req.body.email;
  const query = "SELECT company_email, job_id FROM application WHERE candidate_email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: "failure" });
    } else {
      const query_2 = "SELECT * FROM job_posts WHERE id = ? AND company_email = ?";
      for(let i = 0; i <result.length; i++)
      {
        db.query(query_2, [result[i].job_id, result[i].company_email], (err, result2) => {
          if (err) {
            console.log(err);
            console.log("error inside 2nd query getappliedjob");
            res.send({ status: "failure" });
          } else {
            jobList.push(result2);
            completedQueries++;
            if(completedQueries === result.length){              
              res.send({ status: "success", posts: jobList });
            }
          }
        }); 
      }
    }
  });
});

app.get("/getJobPosts", (req, res) => {
  const query = "SELECT * FROM job_posts";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: "failure" });
    } else {
      res.send({ status: "success", posts: result });
    }
  });
});

app.get("/getCandidatesProfile",(req,res) => {
  const query = "SELECT * FROM candidate_profile";

  db.query(query, (err,result) => {
     if (err) {
      console.log(err);
      res.send({ status: "failure" });
    } else {
      res.send({ status: "success", posts: result });
    }

  });

});

app.post("/deleteJob", (req, res) => {
  const id = req.body.id;
  const query = "DELETE FROM job_posts WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: "failure" });
    } else {
      res.send({ status: "success" });
    }
  });
});
app.post("/getUnappliedJobs", (req,res) => {
  const candidate_email = req.body.candidate_email;
  const query = `SELECT * FROM job_posts WHERE (company_email, id) NOT IN (SELECT company_email, job_id FROM application WHERE candidate_email = ?)`;

  db.query(query, [candidate_email], (err,result) =>{
    if (err) {
      console.log(err);
      res.send({ status: "failure" });
    } else {
      console.log(result);
      res.send({ status: "success" , posts: result});
    }
  });
});

app.post("/deleteCandidateProfile", (req, res) => {
  const email = req.body.email;
  const query = "DELETE FROM candidate_profile WHERE email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: "failure" });
    } else {
      const query_2 = "DELETE FROM user_account WHERE email = ?";
      db.query(query_2, [email], (err, result)=>{
        if (err) {
          console.log(err);
          res.send({ status: "failure" });
        } else {
          res.send({ status: "success" });
        }
      });
    }
  });
});

app.post("/deleteCompanyProfile", (req, res) => {
  const email = req.body.email;
  const query = "DELETE FROM company_profile WHERE email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: "failure" });
    } else {
      const query_2 = "DELETE FROM user_account WHERE email = ?";
      db.query(query_2, [email], (err, result)=>{
        if (err) {
          console.log(err);
          res.send({ status: "failure" });
        } else {
          res.send({ status: "success" });
        }
      });
    }
  });
});

app.post("/reportJob", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const query_1 =
    "SELECT report FROM job_posts WHERE id = ? AND company_email = ?";

  db.query(query_1, [id, email], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: "failure" });
    } else {
      reportValue = result[0].report;
      const query =
        "UPDATE job_posts SET report = ? WHERE id = ? AND company_email = ?";

      db.query(query, [reportValue + 1, id, email], (err, result) => {
        if (err) {
          console.log(err);
          res.send({ status: "failure" });
        } else {
          res.send({ status: "success" });
        }
      });
    }
  });
});

app.post("/getJobPost", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const query = "SELECT * FROM job_posts WHERE id = ? AND company_email = ?";

  db.query(query, [id, email], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: "failure" });
    } else {
      res.send({ status: "success", posts: result });
    }
  });
});

app.post("/updateJobPost", (req, res) => {
  const id = req.body.id;
  const company_email = req.body.email;
  const title = req.body.title;
  const description = req.body.description;
  const tag = req.body.tag;
  const location = req.body.location;
  const type = req.body.type;
  const salary = req.body.salary;

  const query =
    "UPDATE job_posts SET title = ?, description = ?, tag = ?, location = ?, type = ?, salary = ? WHERE id = ? AND company_email = ?";

  db.query(
    query,
    [title, description, tag, location, type, salary, id, company_email],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: "failure" });
      } else {
        res.send({ status: "success" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running express server");
});
