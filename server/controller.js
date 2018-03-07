const axios = require("axios");
require("dotenv").config();

const news = (req, res) => {
  axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=ad6e78e181474f219261787c1447ff90").then(response => res.status(200).send(response.data)).catch(() => console.log("couldnt get news"))
}

const checkUser = (req, res, next) => {
  const dbInstance = req.app.get("db");
  dbInstance
    .get_user(req.user.id)
    .then(response => {
      if (response.length < 1) {
        dbInstance
          .add_user([
            req.user.id,
            req.user.displayName,
            req.user.nickname,
            req.user.picture
          ])
          .then(response => console.log(response))
          .catch(() => console.log("error add user"));
      }
    })
    .catch(() => console.log("error get user"));
};

const addPost = (req, res, next) => {
  const dbInstance = req.app.get("db");


  dbInstance.get_user(req.session.passport.user.id).then(result => {
    dbInstance
      .new_post([
        req.session.passport.user.id,
        req.body.post,
        req.session.passport.user.displayName,
        req.body.category,
        req.body.title,
        req.session.passport.user.picture,
        result[0].id
      ])
      .then(() => console.log("post succesful"))
      .catch(() => console.log("error add post"))
  }
  )
}




const getAll = (req, res, next) => {
  const dbInstance = req.app.get("db");

  dbInstance
    .get_all_posts()
    .then(response => res.status(200).send(response))
    .catch(() => console.log("error on get posts"));
};

const getUser = (req, res) => {
  if (req.session.passport) {
    let user = {
      name: req.session.passport.user.displayName,
      img: req.session.passport.user.picture,
      id: req.session.passport.user.id
    };
    res.status(200).send(user);
  }
};

const getCategory = (req, res) => {
  const dbInstance = req.app.get("db");

  dbInstance
    .get_category(req.params.category)
    .then(response => res.status(200).send(response))
    .catch(() => console.log("error getting category"));
};

const signOut = (req, res, next) => {
  req.session.destroy();
  res.status(200).send();
  next();
};

const getPosts = (req, res) => {
  const dbInstance = req.app.get("db");

  dbInstance
    .get_posts(req.session.passport.user.id)
    .then(response => res.status(200).send(response))
    .catch(() => console.log("error in get user post for profile"));
};

const getLikes = (req, res) => {
  const dbInstance = req.app.get("db");

  dbInstance
    .get_likes(req.session.passport.user.id)
    .then(response => res.status(200).send(response))
    .catch(() => console.log("error in get user post for profile"));
};

const getPost = (req, res) => {
  const dbInstance = req.app.get("db");

  dbInstance
    .get_post(req.params.id)
    .then(response => res.status(200).send(response))
    .catch(() => console.log("error in get single post"));
}

const postComment = (req, res) => {

  const dbInstance = req.app.get("db");

  dbInstance
    .post_comment([req.session.passport.user.id, req.body.body, req.body.post, req.session.passport.user.picture, req.session.passport.user.displayName])
    .then(res.status(200).send())
    .catch(() => console.log("error in get single post"));
}

const getComments = (req, res) => {
  const dbInstance = req.app.get("db");

  dbInstance
    .get_comments(req.params.id)
    .then(response => res.status(200).send(response))
    .catch(() => console.log("error in get comments"));
}



const postLikes = (req, res) => {

  const dbInstance = req.app.get("db");


  dbInstance
    .post_likes(req.params.id)
    .then(response => res.status(200).send(response))
    .catch(() => console.log("error in get likes"));

}


const changeRate = (req, res) => {
  let likes = [];
  const dbInstance = req.app.get("db");

  dbInstance
    .like_check([req.session.passport.user.id, req.body.id])
    .then(response => {
      if (response.length === 0) {
        dbInstance
          .add_like([req.session.passport.user.id, req.body.id])
          .then(result => res.status(200).send(result)
          )
          .catch(() => console.log("error in change rate"));
      }
    })
    .catch(() => console.log("error in get user post for profile"));
  let rate = req.body.rate += 1;
  dbInstance
    .change_rating([rate, parseInt(req.body.id)])
    .then(() => console.log("rate changed"))
    .catch(() => console.log("it dont work"))

}

const removeLike = (req, res) => {


  const dbInstance = req.app.get("db");


  dbInstance
    .remove_like([req.session.passport.user.id, req.params.id])
    .then(
      dbInstance
        .post_likes(req.params.id)
        .then(response => res.status(200).send(response))
        .catch(() => console.log("error in get likes while deleting"))
    )
    .catch(() => console.log("error deleting like"));

  let rate = req.body.rate -= 1;
  dbInstance
    .change_rating([rate, parseInt(req.body.id)])
    .then(() => console.log("rate changed"))
    .catch(() => console.log("it dont work"))

}

const userProfile = (req, res) => {

  let user = {}

  const dbInstance = req.app.get("db");

  dbInstance.get_profile(req.params.id).then(result => {
    user = result
    dbInstance.get_likes(user[0].authid).then(re => {
      user.push(re)
      dbInstance.get_posts(user[0].authid).then(r => {
        user.push(r)
        res.send(user)
      })
    })
  })


}


module.exports = {
  userProfile: userProfile,
  news: news,
  removeLike: removeLike,
  postLikes: postLikes,
  changeRate: changeRate,
  getComments: getComments,
  postComment: postComment,
  getPost: getPost,
  getLikes: getLikes,
  getPosts: getPosts,
  signOut: signOut,
  getCategory: getCategory,
  checkUser: checkUser,
  getAll: getAll,
  getUser: getUser,
  addPost: addPost
};
