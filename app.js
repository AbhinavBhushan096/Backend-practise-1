/* const catMe = require('cat-me')

console.log(catMe()) */

// const http = require("http");

// create server
// const server = http.createServer((req, res) => {
/* console.log(req.url)
    res.end('Hello World')//response main hellow world */
//Routing
/*   if (req.url == "/about") {
    res.end("The about page");
  }
  if (req.url == "/profile") {
    res.end("The profile page");
  }
  if (req.url == "/") {
    res.end("The Home Page");
  }
});
 */
// server.listen(3000); //3000 is the port ||| it will start the sever

//Express

const express = require("express");
const morgan = require("morgan"); //logger
const app = express();
const dbConnection = require("./config/db");
const userModel = require("./models/user");
app.use(morgan("dev"));

// built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//view enjine
app.set("view engine", "ejs");

//middleware-- kis bhi route se phele yaha pe jata hain
/* app.use((req, res, next) => {
  console.log("this is a middleware");
  // res.send('this is a middleware')
  const a = 2;
  const b = 3;
  console.log (a+b)
  return next();
});
 */
app.get(
  "/",
  // (req, res, next) => {
  //   const a = 5;
  //   const b = 10;
  //   console.log(a + b);

  //   next()/* this help in passing it to the next one */
  // },
  (req, res) => {
    // res.send('Hello World')
    res.render("index");
  }
);

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/profile", (req, res) => {
  res.send("Profile Page");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  //   console.log(req.body);
  const { username, email, password } = req.body;

  const newUser = await userModel.create({
    username: username,
    email: email,
    password: password,
  }); //asynchronous code -quee min chale jata hain

  res.send(newUser);
});

app.get("/get-user", (req, res) => {
  userModel
    .findOne({
      username: "h",
    })
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

app.get("/update-user", async (req, res) => {
  await userModel.findOneAndUpdate(
    {
      username: "ad",
    },
    {
      email: "c@cc.com",
    }
  );

  res.send("user update");
});
app.get("/delete-user", async (req, res) => {
  await userModel.findOneAndDelete({
    username: "ad",
  });

  res.send("user deleted");
});

app.post("/get-form-data", (req, res) => {
  console.log(req.body);
  res.send("data received");
});

//routing through express
app.listen(3000);
