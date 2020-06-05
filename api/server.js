const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


//route

//create a user
app.post('/users', async(req,res) =>{
      try {
         const {firstname,lastname,phone,email} = req.body;
         const newUser = await pool.query(
           "INSERT INTO users (firstname,lastname,phone,email) VALUES ($1,$2,$3,$4) RETURNING * ",
           [firstname,lastname,phone,email]
);
  res.json(newUser.rows[0]);

      } catch (err) {
        console.error(err.message);
      }
})

//get all user
app.get("/users", async function(req, res, next) {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    return res.json(allUsers.rows);
  } catch (err) {
    return next(err);
  }
});

//get a user
app.get("/users/:id", async function(req, res) {
  try {
    const {id} = req.params;
    const user = await pool.query("SELECT * FROM users WHERE id = $1" ,[id]);

    return res.json(user.rows[0]);
  } catch (err) {
    return next(err);
  }
});
//update a user
  app.put("/users/:id", async function(req, res) {
    try {
      const {id} = req.params;
      const {firstname,lastname,phone,email} = req.body;

      const updateUser =await pool.query(
        "UPDATE users SET firstname=$1, lastname=$2, phone=$3, email=$4 WHERE id=$5 RETURNING *",
        [firstname,lastname,phone,email,id]
      );
  
      return res.json(updateUser.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  //delete a user
    app.delete("/users/:id", async function(req, res) {
    try {
      const deleteUser = await pool.query("DELETE FROM users WHERE id=$1", [
        req.params.id
      ]);
      return res.json({ message: "User Was Deleted" });
    } catch (err) {
      console.error(err.message);
    }
  });


app.listen(port , ()=> {
  console.log(`app is running on port ${port}`);
})
