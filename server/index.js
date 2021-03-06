const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const massive = require("massive");
const Auth0Strategy = require("passport-auth0");
const strategy = require("../strategy");
require("dotenv").config();


const {
  search,
  editPost,
  news,
  deletePost,
  removeLike,
  getComments,
  postComment,
  getAll,
  getUser,
  addPost,
  checkUser,
  getCategory,
  signOut,
  getPosts,
  getLikes,
  getPost,
  changeRate,
  postLikes,
  userProfile,
  getUserLikedPosts
} = require("./controller");
const app = express();

app.use(express.static(`${__dirname}/../build`))

app.use(
  session({
    secret: "@nyth!ng y0u w@nT",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000
    }
  })
);

app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    //console.log(dbInstance);
  })
  .catch(() => console.log("error"));

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/me",
    failureRedirect: "/login",
    failureFlash: true,


  })
);
app.get("/me", (req, res, next) => {
  if (!req.user) {
    console.log(req.session.user)
    res.redirect("/login");
  } else {
    console.log(req)
    checkUser(req);
    // res.status(200).send(req.user);
    // console.log(req.session);

    req.session.user = {
      id: req.user.id,
      name: req.user.displayName,
      nickName: req.user.nickname,
      img: req.user.picture
    };
  }


  res.redirect("/#/profile");
});

app.get("/api/profile/:id", userProfile)
app.get("/api/news", news)
app.post("/api/post", addPost);
app.get("/api/get", getAll);
app.get("/api/user", getUser);
app.get("/api/get/:category", getCategory);
app.get("/api/signOut", signOut);
app.get("/api/posts", getPosts);
app.get("/api/likes", getLikes);
app.get("/entry/:id", getPost);
app.post("/post/comment", postComment);
app.get("/comments/:id", getComments);
app.put("/api/changeRating", changeRate)
app.get("/api/postLikes/:id", postLikes)
app.put("/api/like/:id", removeLike);
app.get("/api/liked/:id", getUserLikedPosts);
app.put("/api/edit", editPost);
app.get("/api/search/:search", search);
app.delete("/api/delete/:id", deletePost);


let port = 3002;
const path = require('path');

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(port, () => console.log(`listening on port ${port}`));
