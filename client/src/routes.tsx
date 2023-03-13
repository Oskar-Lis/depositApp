import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/utils/protectedRoute";

import Landing from "./components/layouts/landing";
import Alert from "./components/layouts/alert";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import HomePage from "./components/home";
import CreateItems from "./components/items/create-item";
import Profiles from "./components/profiles/profiles";
import profile from "./components/profile/profile";
import Posts from "./components/posts/posts";
import Post from "./components/post/post";
import Deposit from './components/items/deposit'

function Routes() {
  return (
    <>
      <Switch>
        <ProtectedRoute
          path="/"
          exact
          element={<Landing />}
          componentIfAuth={false}
        />
        <>
          {/* use <> inside Switch not anything else */}
          <section className="container">
            <Alert />
            <ProtectedRoute
              path="/register"
              exact
              element={<Register />}
              componentIfAuth={false}
            />
            <ProtectedRoute
              path="/login"
              exact
              element={<Login />}
              componentIfAuth={false}
            />
            <ProtectedRoute path="/home" exact element={<HomePage />} />
            <Route path="/profiles" exact component={Profiles} />
            <Route path="/profile/:userId" exact component={profile} />
            <Route path="/deposit" exact component={Deposit} />
            <ProtectedRoute
              path="/create-item"
              exact
              element={<CreateItems />}
            />
            <ProtectedRoute path="/posts" exact element={<Posts />} />
            <ProtectedRoute path="/posts/:postId" exact element={<Post />} />
          </section>
        </>
      </Switch>
    </>
  );
}

export default Routes;
