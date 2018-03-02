import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Software from "./components/categories/Software";
import Hardware from "./components/categories/Hardware";
import Crypto from "./components/categories/Crypto";
import Climate from "./components/categories/Climate";
import AddPost from "./components/newPost";
import Profile from "./components/Profile";
import Post from "./components/Post";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Software" component={Software} />
    <Route path="/Hardware" component={Hardware} />
    <Route path="/Crypto" component={Crypto} />
    <Route path="/Climate" component={Climate} />
    <Route path="/newPost" component={AddPost} />
    <Route path="/profile" component={Profile} />
    <Route path="/post/:category" component={AddPost} />
    <Route path="/entry/:id" component={Post} />
  </Switch>
);